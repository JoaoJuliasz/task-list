import { Dispatch, SetStateAction, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

import Header from "./components/Header/Header"
import Tasks from "./components/Tasks/Tasks"

import { Tasks as TasksType } from "../../types/Task.type"

import style from './taskContainer.module.css'
import { useTask } from "../../hooks/useTask"

type Props = {
    title: string
    tasks: string[]
    index: number
    setTaskList: Dispatch<SetStateAction<TasksType>>
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

const TaskContainer = ({ title, tasks, index, setTaskList, moveItem }: Props) => {
    const { newTask, setNewTask, addTask } = useTask(setTaskList)

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

    return (
        <div ref={ref} className={`${style.container} ${isDragging ? style.grabbing : ''}`}>
            <Header title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={addTask} />
            <Tasks title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={addTask}
                newTask={newTask} setNewTask={setNewTask} />
        </div>
    )
}

export default TaskContainer