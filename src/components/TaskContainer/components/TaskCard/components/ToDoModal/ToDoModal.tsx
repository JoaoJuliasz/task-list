import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Modal } from "antd";
import ToDoList from "../ToDoList/ToDoList";

import { useTaskListContext } from "../../../../../../hooks/useTaskListContext";

import { Tasks, Todo } from "../../../../../../types/Task.type";

import style from './todoModal.module.css'

type Props = {
    todoList?: Todo[]
    title: string
    index: number
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const ToDoModal = ({ title, index, todoList, modalOpen, setModalOpen }: Props) => {
    const [taskTodoList, setTaskTodoList] = useState<Todo[]>([])

    const { setTaskList } = useTaskListContext()

    const handleClose = () => {
        setTaskTodoList([])
        setModalOpen(false)
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

    useEffect(() => {
        if (modalOpen) setTaskTodoList(todoList ?? [])
    }, [modalOpen])

    if (!modalOpen) return null

    return (
        <Modal
            title="To Do Items"
            open={modalOpen}
            onOk={handleOnOkTodoList}
            maskClosable={true}
            onCancel={handleClose}
            destroyOnClose={true}
            closeIcon={false}
            classNames={{content: style.container}}
            cancelButtonProps={{className: style.cancel}}
            okButtonProps={{className: style.ok}}
        >
            <ToDoList todoList={taskTodoList} setTaskTodoList={setTaskTodoList} />
        </Modal>
    );
};

export default ToDoModal;