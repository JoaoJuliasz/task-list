import { EditOutlined } from "@ant-design/icons";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
    title: string
    task: string
    index: number
    setTaskList: Dispatch<SetStateAction<string[]>>
}

const TaskCard = ({ title, task, index, setTaskList }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)

    const cardRef = useRef<any>(null)

    const handleEdit = (value: boolean) => {
        setEdit(value)
        if (value) {
            cardRef.current?.focus()
        }
    }

    const handleShowEdit = (value: boolean) => {
        setShowEdit(value)
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
    }

    return (
        <div style={{
            maxWidth: '100%', minHeight: '40px', margin: '10px 0',
            position: 'relative', borderRadius: '5px', background: '#ffffff0e'
        }}
            onMouseEnter={() => handleShowEdit(true)}
            onMouseLeave={() => handleShowEdit(false)}>
            <textarea style={{
                border: 'none', outline: 'none', height: '100%',
                resize: 'none', width: '100%', background: 'transparent'
            }}
                value={task} onChange={handleChange}
                ref={cardRef} placeholder="untitled" onBlur={() => handleEdit(false)} 
                readOnly={!edit}/>
            {showEdit ? !edit ?
                <a style={{ position: 'absolute', top: 8, right: 3, cursor: 'pointer', color: '#fff' }} onClick={() => handleEdit(true)}>
                    <EditOutlined />
                </a> : null
                : null}
        </div>
    );
};

export default TaskCard;