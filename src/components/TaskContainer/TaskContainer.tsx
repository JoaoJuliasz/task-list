import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"

import Header from "./components/Header/Header"
import Tasks from "./components/Tasks/Tasks"

import { Tasks as TasksType } from "../../types/Task.type"

import style from './taskContainer.module.css'

type Props = {
    title: string
    tasks: string[]
    index: number
    setTaskList: Dispatch<SetStateAction<TasksType>>
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

const TaskContainer = ({ title, tasks, index, setTaskList, moveItem }: Props) => {
    const [newTask, setNewTask] = useState<number>(-1)
    const ref = useRef(null)

    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { type: "ITEM", index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "ITEM",
        hover(item: { type: string, index: number }) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    drag(drop(ref))

    const handleAdd = (start?: boolean) => {
        setTaskList(prev => ({ ...prev, [title]: start ? ['', ...prev[title]] : [...prev[title], ''] }))

        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = taskManager[title] ? (start ? ['', ...tasks] : [...tasks, '']) : ['']
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
        setNewTask(start ? 0 : taskManager[title].length - 1)

    }

    const handleDrop = (prevTitle: string, title: string, taskIndex: number, hoverIndex: number) => {
        setTaskList(prev => {
            const updatedTaskList = { ...prev }  // Shallow copy of the task list

            if (!updatedTaskList[prevTitle] || !updatedTaskList[title]) {
                return prev
            }

            const movedTask = updatedTaskList[prevTitle][taskIndex]
            updatedTaskList[prevTitle] = [
                ...updatedTaskList[prevTitle].slice(0, taskIndex),
                ...updatedTaskList[prevTitle].slice(taskIndex + 1)
            ]

            updatedTaskList[title] = [
                ...updatedTaskList[title].slice(0, hoverIndex),
                movedTask,
                ...updatedTaskList[title].slice(hoverIndex)
            ]

            localStorage.setItem('task-manager', JSON.stringify(updatedTaskList))

            return updatedTaskList
        })
    }

    return (
        <div ref={ref} className={`${style.container} ${isDragging ? style.grabbing : ''}`}>
            <Header title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd} />
            <Tasks title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd}
                newTask={newTask} setNewTask={setNewTask} handleDrop={handleDrop} />
        </div>
    )
}

export default TaskContainer