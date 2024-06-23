import { Dispatch, SetStateAction, useState } from "react";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import MenuComponent from '../../../../../Menu/Menu'

import { Tasks } from "../../../../../../types/Task.type";

import style from './menu.module.css'
import homeStyle from '../../taskCard.module.css'
import { useTask } from "../../../../../../hooks/useTask";
import { MenuProps } from "antd";


type Props = {
    title: string
    index: number
    currTask: string
    setTaskList: Dispatch<SetStateAction<Tasks>>
    handleEdit: (value: boolean) => void
}

const Menu = ({ title, index, currTask, setTaskList, handleEdit }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { deleteOne } = useTask(setTaskList)

    const handleDelete = () => deleteOne(title, index)

    const copyToClipboard = () => navigator.clipboard.writeText(currTask);

    return (
        <div className={`${style.container} ${homeStyle.actions} ${isOpen ? style.noOpacity : ''}`}>
            <a className={style.edit} onClick={() => handleEdit(true)}>
                <EditOutlined />
            </a>
            <MenuComponent items={[
                { key: '1', label: (<div onClick={copyToClipboard}>Copy</div>), itemIcon: <CopyOutlined /> },
                { key: '2', label: (<div onClick={handleDelete}>Remove</div>), itemIcon: <DeleteOutlined /> }
            ] as MenuProps['items']} isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    );
};

export default Menu;