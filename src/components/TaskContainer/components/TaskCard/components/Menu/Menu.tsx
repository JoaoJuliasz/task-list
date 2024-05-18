import { Dispatch, SetStateAction, useRef, useState } from "react";
import { CopyOutlined, DashOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"; ''

import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Tasks } from "../../../../../../types/Task.type";

import style from './menu.module.css'
import homeStyle from '../../taskCard.module.css'
import { useTask } from "../../../../../../hooks/useTask";


type Props = {
    title: string
    index: number
    currTask: string
    setTaskList: Dispatch<SetStateAction<Tasks>>
    handleEdit: (value: boolean) => void
}

const Menu = ({ title, index, currTask, setTaskList, handleEdit }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

    const { deleteOne } = useTask(setTaskList)

    const ref = useRef(null);

    const handleDelete = () => deleteOne(title, index)

    const copyToClipboard = () => navigator.clipboard.writeText(currTask);

    return (
        <div className={`${style.container} ${homeStyle.actions} ${isOpen ? style.isOpen : ''}`}>
            <a className={style.edit} onClick={() => handleEdit(true)}>
                <EditOutlined />
            </a>
            <div className={style.openMenu} ref={ref} {...anchorProps}>
                <DashOutlined />
            </div>
            <ControlledMenu
                {...hoverProps}
                menuClassName={style.menu}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
            >
                <MenuItem className={({ hover }) => (hover ? style.itemHover : "") + ` ${style.item}`} onClick={copyToClipboard}><CopyOutlined /> Copy</MenuItem>
                <MenuItem className={({ hover }) => (hover ? style.itemHover : "") + ` ${style.item}`} onClick={handleDelete}><DeleteOutlined /> Remove</MenuItem>
            </ControlledMenu>
        </div>
    );
};

export default Menu;