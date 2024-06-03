import { Dispatch, SetStateAction } from "react";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import MenuComponent from '../../../../../Menu/Menu'

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

    const { deleteOne } = useTask(setTaskList)

    const handleDelete = () => deleteOne(title, index)

    const copyToClipboard = () => navigator.clipboard.writeText(currTask);

    return (
        <div className={`${style.container} ${homeStyle.actions}`}>
            <a className={style.edit} onClick={() => handleEdit(true)}>
                <EditOutlined />
            </a>
            <MenuComponent children={[
                <div onClick={copyToClipboard}><CopyOutlined /> Copy</div>,
                <div onClick={handleDelete}><DeleteOutlined /> Remove</div>
            ]} task={true} />

        </div>
    );
};

export default Menu;