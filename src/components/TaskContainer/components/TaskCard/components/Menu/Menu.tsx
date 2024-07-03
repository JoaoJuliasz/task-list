import { useState } from "react";
import { CopyOutlined, DeleteOutlined, EditOutlined, OrderedListOutlined } from "@ant-design/icons";

import MenuComponent from '../../../../../Menu/Menu'

import { Task, Tasks, Todo } from "../../../../../../types/Task.type";

import style from './menu.module.css'
import homeStyle from '../../taskCard.module.css'
import { useTask } from "../../../../../../hooks/useTask";
import { MenuProps, Modal } from "antd";
import ToDoList from "../ToDoList/ToDoList";
import { useTaskListContext } from "../../../../../../hooks/useTaskListContext";


type Props = {
    title: string
    index: number
    currTask: Task
    handleEdit: (value: boolean) => void
}

const Menu = ({ title, index, currTask, handleEdit }: Props) => {
    const [taskTodoList, setTaskTodoList] = useState<Todo[]>(currTask.list ?? [])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const { setTaskList } = useTaskListContext()

    const { deleteOne } = useTask()

    const handleDelete = () => deleteOne(title, index)

    const handleTodoList = () => {
        setModalOpen(true)
    }

    const handleOnOkTodoList = () => {
        setTaskList(prev => {
            const updtPrev: Tasks = JSON.parse(JSON.stringify(prev))
            updtPrev[title][index].type = 'todo'
            updtPrev[title][index].list = taskTodoList
            localStorage.setItem('task-manager', JSON.stringify(updtPrev))
            return updtPrev
        })
        setModalOpen(false)
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
            <Modal
                title="To Do Items"
                open={modalOpen}
                onOk={handleOnOkTodoList}
            >
                <ToDoList todoList={taskTodoList} setTaskTodoList={setTaskTodoList} />
            </Modal>
        </div>
    );
};

export default Menu;