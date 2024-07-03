import { Dispatch, SetStateAction, useRef } from "react"

import Header from "./components/Header/Header"
import Tasks from "./components/Tasks/Tasks"

import { useTask } from "../../hooks/useTask"
import { useDragNDrop } from "../../hooks/useDragNDrop"

import { Task } from "../../types/Task.type"

import style from './taskContainer.module.css'
import { Item } from "../../types/DragNDrop.type"

type Props = {
    title: string
    tasks: Task[]
    index: number
    moveItem: (dragIndex: number, hoverIndex: number) => void
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const TaskContainer = ({ title, tasks, index, setTasksTitles, moveItem }: Props) => {
    const { newTask, setNewTask, addTask } = useTask()

    const ref = useRef<HTMLDivElement>(null)

    const hoverFn = (item: Item) => {
        if (!ref.current) {
            return
        }
        const dragIndex = item.index as number
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
            return
        }
        moveItem(dragIndex, hoverIndex)
        item.index = hoverIndex
    }

    const { isDragging } = useDragNDrop('ITEM', ref, { type: "ITEM", index }, hoverFn)

    return (
        <div ref={ref} className={`${style.container} ${isDragging ? style.grabbing : ''}`}>
            <Header index={index} title={title} taskList={tasks} handleAdd={addTask} setTasksTitles={setTasksTitles} />
            <Tasks title={title} taskList={tasks} handleAdd={addTask}
                newTask={newTask} setNewTask={setNewTask} />
        </div>
    )
}

export default TaskContainer