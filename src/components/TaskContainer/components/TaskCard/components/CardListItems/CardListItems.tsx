import { Checkbox, List } from "antd";
import { useState } from "react";
import { Todo } from "../../../../../../types/Task.type";
import ToDoItem from "../ToDoList/component/ToDoItem/ToDoItem";
import ToDoModal from "../ToDoModal/ToDoModal";

import style from './cardListItems.module.css'

type Props = {
    title: string
    index: number
    taskList: Todo[]
}

const CardListItems = ({ title, index, taskList }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return (
        <>
            <div className={style.container} onClick={() => setModalOpen(true)}>
                <List className={style.list}>
                    {taskList.slice(0, 5).map((item, index) =>
                        <ToDoItem todo={item} index={index} isCard={true} />
                    )}
                </List>
            </div>
            <ToDoModal title={title} index={index} todoList={taskList}
                modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default CardListItems;