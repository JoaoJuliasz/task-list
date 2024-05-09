import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import ReactTextareaAutosize from "react-textarea-autosize";

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

    return (
        <div className={style.container} onBlur={() => handleEdit(false)}>
            <div className={style.textContainer}>
                <ReactTextareaAutosize className={style.text}
                    value={currTask}
                    onChange={handleChange}
                    ref={textAreaRef} placeholder="untitled"
                    readOnly={!edit && newTask !== index} autoFocus={newTask === index}
                />

                {!edit ?
                    <div className={style.actions}>
                        <a className={style.edit} onClick={() => handleEdit(true)}>
                            <EditOutlined />
                        </a>
                        <a className={style.copy} onClick={() => {
                            navigator.clipboard.writeText(currTask)
                        }}>
                            <CopyOutlined />
                        </a>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default TaskCard;