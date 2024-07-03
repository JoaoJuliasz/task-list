import { Dispatch, SetStateAction, useState } from "react";

import style from './header.module.css'
import { Task } from "../../../../types/Task.type";
import Menu from "./components/Menu/Menu";
import UpdateTitle from "../../../UpdateTitle/UpdateTitle";

type Props = {
    index: number
    title: string
    taskList: Task[]
    handleAdd: (title: string, start?: boolean | undefined) => void
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const Header = ({ index, title, taskList, handleAdd, setTasksTitles }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={style.container}>
            <div className={style.titleContainer}>
                <UpdateTitle index={index} currTitle={title} titleClassName={style.title} setTasksTitles={setTasksTitles} />
                <span className={style.count}>{taskList?.length ?? 0}</span>
            </div>
            <div className={`${style.optionsContainer} ${isOpen ? style.noOpacity : ''}`}>
                <Menu title={title} handleAdd={handleAdd} setTasksTitles={setTasksTitles}
                    isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
};

export default Header;