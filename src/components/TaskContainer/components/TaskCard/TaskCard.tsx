import { Dispatch, SetStateAction, useRef, useState } from "react";
import Menu from "./components/Menu/Menu";
import TaskInput from "./components/TaskInput/TaskInput";

import { useTask } from "../../../../hooks/useTask";
import { useDragNDrop } from "../../../../hooks/useDragNDrop";

import { Tasks } from "../../../../types/Task.type";

import style from './taskCard.module.css'

type Props = {
    title: string
    task: string
    index: number
    newTask: number
    setTaskList: Dispatch<SetStateAction<Tasks>>
    setNewTask: Dispatch<SetStateAction<number>>
}

const TaskCard = ({ title, task, index, newTask, setTaskList, setNewTask }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [currTask, setCurrTask] = useState<string>(task)

    const { updateTask, updateListOnDrop } = useTask(setTaskList)

    const dragRef = useRef<HTMLDivElement>(null);

    const hoverFn = (item: any) => {
        if (!dragRef.current) {
            return;
        }
        if (item.taskIndex === index && item.title === title) {
            return;
        }
    }
    const dropFn = (item: any, monitor: any) => {
        if (!monitor.didDrop()) {
            const dragIndex = item.taskIndex;
            const hoverIndex = index;
            if (dragIndex !== hoverIndex || item.title !== title) {
                updateListOnDrop(item.title, title, dragIndex, hoverIndex);
            }
        }
    }

    const { isDragging } = useDragNDrop('TASK', dragRef, { title, taskIndex: index }, hoverFn, dropFn)

    const handleEdit = (value: boolean) => {
        setEdit(value)
        if (!value) {
            setNewTask(-1)
            // should update the state
            updateTask(title, index, currTask)
        }
    }

    return (
        <div className={`${style.container} ${isDragging ? style.dragging : ''}`} onBlur={() => handleEdit(false)} ref={dragRef}>
            <div className={style.textContainer}>
                {edit || newTask === index ?
                    <TaskInput currTask={currTask} setCurrTask={setCurrTask} handleEdit={handleEdit} />
                    :
                    <div className={style.notEdit}>
                        <span style={{ opacity: !currTask ? 0.4 : 1 }}>{currTask || 'untitled'}</span>
                    </div>
                }

                {!edit || newTask !== index ?
                    <Menu title={title} index={index} currTask={currTask} setTaskList={setTaskList} handleEdit={handleEdit} />
                    : null
                }
            </div>
        </div>
    );

};

export default TaskCard;