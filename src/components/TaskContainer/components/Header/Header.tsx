import { Dispatch, SetStateAction, useState } from "react";

import style from './header.module.css'
import { Tasks } from "../../../../types/Task.type";
import Menu from "./components/Menu/Menu";


type Props = {
    title: string
    taskList: string[]
    handleAdd: (title: string, start?: boolean | undefined) => void
    setTaskList: Dispatch<SetStateAction<Tasks>>
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const Header = ({ title, taskList, handleAdd, setTaskList, setTasksTitles }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [headerTitle, setHeaderTitle] = useState<string>(title)

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
                <Menu title={title} setTaskList={setTaskList} handleAdd={handleAdd} setTasksTitles={setTasksTitles} />
            </div>
        </div>
    );
};

export default Header;