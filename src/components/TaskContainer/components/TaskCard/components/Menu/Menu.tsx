import { useState } from "react";

import { CopyOutlined, DeleteOutlined, EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

import MenuComponent from '../../../../../Menu/Menu'
import ToDoModal from "../ToDoModal/ToDoModal";

import { useTask } from "../../../../../../hooks/useTask";

import { Task } from "../../../../../../types/Task.type";

import style from './menu.module.css'
import homeStyle from '../../taskCard.module.css'


type Props = {
    title: string
    index: number
    currTask: Task
    handleEdit: (value: boolean) => void
}

const Menu = ({ title, index, currTask, handleEdit }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const { deleteOne } = useTask()

    const handleDelete = () => deleteOne(title, index)
    const handleTodoList = () => {
        setModalOpen(true)
    }

    const copyToClipboard = () => navigator.clipboard.writeText(currTask.name);

    return (
        <div className={`${style.container} ${homeStyle.actions} ${isOpen ? style.noOpacity : ''}`}>
            <a className={style.edit} onClick={() => handleEdit(true)}>
                <EditOutlined />
            </a>
            <MenuComponent items={[
                { key: '1', label: (<div onClick={copyToClipboard}>Copy</div>), itemIcon: <CopyOutlined /> },
                { key: '2', label: (<div onClick={handleTodoList}>To Do List</div>), itemIcon: <OrderedListOutlined /> },
                { key: '3', label: (<div onClick={handleDelete}>Remove</div>), itemIcon: <DeleteOutlined /> }
            ] as MenuProps['items']} isOpen={isOpen} setIsOpen={setIsOpen} />
            <ToDoModal title={title} index={index} todoList={currTask?.list}
                modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
};

export default Menu;