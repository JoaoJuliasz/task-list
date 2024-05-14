import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CopyOutlined, DashOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ReactTextareaAutosize from "react-textarea-autosize";

import { Tasks } from "../../../../types/Task.type";
import style from './taskCard.module.css'
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

type Props = {
    title: string
    task: string
    index: number
    newTask: number
    setTaskList: Dispatch<SetStateAction<Tasks>>
    setNewTask: Dispatch<SetStateAction<number>>
    handleDrop: (prevTitle: string, title: string, taskIndex: number, hoverIndex: number) => void
}

const TaskCard = ({ title, task, index, newTask, setTaskList, setNewTask, handleDrop }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [currTask, setCurrTask] = useState<string>(task)

    const [isOpen, setOpen] = useState<boolean>(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

    const dragRef = useRef<HTMLDivElement>(null);
    const ref = useRef(null);

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
                    handleDrop(item.title, title, dragIndex, hoverIndex);
                }
            }
        },
    });

    drag(drop(dragRef));
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleEdit = (value: boolean) => {
        setEdit(value)
        if (value) {
            textAreaRef.current?.focus()
        } else {
            setNewTask(-1)
            // should update the state
            updateTask()
        }
    }

    const updateTask = () => {
        setTaskList(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev[title]))
            updtPrev[index] = currTask
            return { ...prev, [title]: updtPrev }
        })
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title][index] = currTask
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setCurrTask(value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleEdit(false)
        }
    }

    const handleDelete = () => {
        setTaskList(prev => {
            prev[title].splice(index, 1)
            localStorage.setItem("task-manager", JSON.stringify(prev))
            return { ...prev }
        })
    }

    const copyToClipboard = () => navigator.clipboard.writeText(currTask);

    return (
        <div className={`${style.container} ${isDragging ? style.dragging : ''}`} onBlur={() => handleEdit(false)} ref={dragRef}>
            <div className={style.textContainer}>
                {edit || newTask === index ?
                    <ReactTextareaAutosize className={style.text}
                        value={currTask}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        ref={textAreaRef} placeholder="untitled"
                        autoFocus={true}
                    /> :
                    <div className={style.notEdit}>
                        <span style={{ opacity: !currTask ? 0.4 : 1 }}>{currTask || 'untitled'}</span>
                    </div>
                }

                {!edit || newTask !== index ?
                    <div className={style.actions}>
                        <a className={style.edit} onClick={() => handleEdit(true)}>
                            <EditOutlined />
                        </a>
                        <div className={style.copy} ref={ref} {...anchorProps}>
                            <DashOutlined />
                        </div>
                        <ControlledMenu
                            {...hoverProps}
                            state={isOpen ? 'open' : 'closed'}
                            anchorRef={ref}
                            onClose={() => setOpen(false)}
                        >
                            <MenuItem onClick={copyToClipboard}><CopyOutlined /> Copy</MenuItem>
                            <MenuItem onClick={handleDelete}><DeleteOutlined /> Remove</MenuItem>
                        </ControlledMenu>
                    </div>
                    : null
                }
            </div>
        </div>
    );

};

export default TaskCard;