import { Dispatch, SetStateAction, useRef, useState } from "react";
import Menu from "./components/Menu/Menu";
import TaskInput from "./components/TaskInput/TaskInput";

import { useTask } from "../../../../hooks/useTask";
import { useDragNDrop } from "../../../../hooks/useDragNDrop";

import { Task } from "../../../../types/Task.type";

import style from './taskCard.module.css'
import CardListItems from "./components/CardListItems/CardListItems";

type Props = {
    title: string
    task: Task
    index: number
    newTask: number
    empty?: boolean
    setNewTask: Dispatch<SetStateAction<number>>
}

const TaskCard = ({ title, task, index, newTask, empty, setNewTask }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [currTask, setCurrTask] = useState<Task>(task)

    const { updateTask, updateListOnDrop } = useTask()

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

    if (empty) return <div className={style.empty}
        ref={dragRef}></div>

    return (
        <div className={`${style.container} ${isDragging ? style.dragging : ''}`} ref={dragRef}>
            <div className={style.textContainer}>
                {task?.list ?
                    <CardListItems title={title} index={index} taskList={task.list} />
                    : null
                }
                <TaskInput currTask={currTask} setCurrTask={setCurrTask} handleEdit={handleEdit} condition={edit || newTask === index} />
                {/* {edit || newTask === index ?
                    :
                    <div className={style.notEdit}>
                        <span style={{ opacity: !currTask ? 0.4 : 1 }}>{currTask.name || 'untitled'}</span>
                    </div>
                } */}

                {!edit || newTask !== index ?
                    <Menu title={title} index={index} currTask={currTask} handleEdit={handleEdit} />
                    : null
                }
            </div>
        </div>
    );

};

export default TaskCard;