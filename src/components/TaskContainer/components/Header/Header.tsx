import { Dispatch, SetStateAction, useState } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import style from './header.module.css'


type Props = {
    title: string
    taskList: string[]
    handleAdd: (start?: boolean) => void
    setTaskList: Dispatch<SetStateAction<string[]>>
}

const Header = ({ title, taskList, handleAdd, setTaskList }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [headerTitle, setHeaderTitle] = useState<string>(title)

    const handleDelete = () => {
        setTaskList([])
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
                {!edit ? <span className={style.count}>{taskList.length}</span> : null}
            </div>
            <div className={style.optionsContainer}>
                <PlusOutlined onClick={() => handleAdd(true)} />
                <DeleteOutlined onClick={handleDelete} />
            </div>
        </div>
    );
};

export default Header;