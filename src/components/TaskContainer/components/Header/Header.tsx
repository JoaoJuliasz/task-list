import { useState } from "react";

import Menu from "./components/Menu/Menu";
import UpdateTitle from "../../../UpdateTitle/UpdateTitle";

import { useTaskListContext } from "../../../../hooks/useTaskListContext";

import style from './header.module.css'

type Props = {
    index: number
    title: string
    handleAdd: (title: string, start?: boolean | undefined) => void
}

const Header = ({ index, title, handleAdd }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { tasks } = useTaskListContext()

    return (
        <div className={style.container}>
            <div className={style.titleContainer}>
                <UpdateTitle index={index} currTitle={title} titleClassName={style.title} />
                <span className={style.count}>{tasks[title]?.length ?? 0}</span>
            </div>
            <div className={`${style.optionsContainer} ${isOpen ? style.noOpacity : ''}`}>
                <Menu title={title} handleAdd={handleAdd} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
};

export default Header;