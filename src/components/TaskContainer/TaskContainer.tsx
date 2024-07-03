import { useRef } from "react"

import Header from "./components/Header/Header"
import Tasks from "./components/Tasks/Tasks"

import { useTask } from "../../hooks/useTask"
import { useDragNDrop } from "../../hooks/useDragNDrop"

import style from './taskContainer.module.css'
import { Item } from "../../types/DragNDrop.type"

type Props = {
    title: string
    index: number
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

const TaskContainer = ({ title, index, moveItem }: Props) => {
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
            <Header index={index} title={title} handleAdd={addTask} />
            <Tasks title={title} handleAdd={addTask}
                newTask={newTask} setNewTask={setNewTask} />
        </div>
    )
}

export default TaskContainer