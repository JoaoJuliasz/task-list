import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import style from './taskCard.module.css'

type Props = {
    title: string
    task: string
    index: number
    newTask: number
    setTaskList: Dispatch<SetStateAction<string[]>>
    setNewTask: Dispatch<SetStateAction<number>>
}

const TaskCard = ({ title, task, index, newTask, setTaskList, setNewTask }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleEdit = (value: boolean) => {
        setEdit(value)
        if (value) {
            textAreaRef.current?.focus()
        } else {
            setNewTask(-1)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setTaskList(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev))
            updtPrev[index] = value
            return updtPrev
        })
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title][index] = value
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
        resizeTextArea();
    }

    const resizeTextArea = () => {
        if (!textAreaRef.current) {
            return;
        }

        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        resizeTextArea();
        window.addEventListener("resize", resizeTextArea);
    }, []);

    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <textarea className={style.text}
                    value={task} onChange={handleChange}
                    ref={textAreaRef} placeholder="untitled" onBlur={() => handleEdit(false)}
                    readOnly={!edit && newTask !== index} autoFocus={newTask === index} />

                {!edit ?
                    <a className={style.edit} onClick={() => handleEdit(true)}>
                        <EditOutlined />
                    </a> :
                    null}
            </div>
        </div>
    );
};

export default TaskCard;