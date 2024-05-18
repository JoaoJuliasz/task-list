import { Dispatch, SetStateAction, useState } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import style from './header.module.css'
import { Tasks } from "../../../../types/Task.type";


type Props = {
    title: string
    taskList: string[]
    handleAdd: (title: string, start?: boolean | undefined) => void
    setTaskList: Dispatch<SetStateAction<Tasks>>
}

const Header = ({ title, taskList, handleAdd, setTaskList }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [headerTitle, setHeaderTitle] = useState<string>(title)

    const handleDelete = () => {
        setTaskList(prev => ({ ...prev, [title]: [] }))
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = []
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }

    return (
        <div className={style.container}>
            <div className={style.titleContainer}>
                {edit ?
                    <input value={headerTitle}
                        autoFocus onBlur={() => setEdit(false)}
                        className={style.updateTitle}
                        onChange={e => setHeaderTitle(e.target.value)} />
                    :
                    <h5 className={style.title} onClick={() => setEdit(true)}>{headerTitle}</h5>}
                {!edit ? <span className={style.count}>{taskList?.length}</span> : null}
            </div>
            <div className={style.optionsContainer}>
                <PlusOutlined onClick={() => handleAdd(title, true)} />
                <DeleteOutlined onClick={handleDelete} />
            </div>
        </div>
    );
};

export default Header;