import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Menu from "./components/Menu/Menu";

import { useTask } from "../../../../hooks/useTask";

import { Tasks } from "../../../../types/Task.type";
import style from './taskCard.module.css'
import TaskInput from "./components/TaskInput/TaskInput";

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

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { title, taskIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "TASK",
        hover(item: any) {
            if (!dragRef.current) {
                return;
            }
            if (item.taskIndex === index && item.title === title) {
                return;
            }
        },
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                const dragIndex = item.taskIndex;
                const hoverIndex = index;
                if (dragIndex !== hoverIndex || item.title !== title) {
                    updateListOnDrop(item.title, title, dragIndex, hoverIndex);
                }
            }
        },
    });

    drag(drop(dragRef));

    const handleEdit = (value: boolean) => {
        setEdit(value)
        if (value) {
            textAreaRef.current?.focus()
        } else {
            setNewTask(-1)
            // should update the state
            updateTask(title, index, currTask)
        }
    }

    return (
        <div className={`${style.container} ${isDragging ? style.dragging : ''}`} onBlur={() => handleEdit(false)} ref={dragRef}>
            <div className={style.textContainer}>
                <TaskInput currTask={currTask} textAreaRef={textAreaRef} validation={edit || newTask === index}
                    setCurrTask={setCurrTask} handleEdit={handleEdit} />

                {!edit || newTask !== index ?
                    <Menu title={title} index={index} currTask={currTask} setTaskList={setTaskList} handleEdit={handleEdit} />
                    : null
                }
            </div>
        </div>
    );

};

export default TaskCard;