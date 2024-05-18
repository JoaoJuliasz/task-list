import { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard from "../TaskCard/TaskCard";

import style from './tasks.module.css';
import { Tasks as TasksType } from "../../../../types/Task.type";
import { useDrop } from "react-dnd";

type Props = {
    title: string
    taskList: string[]
    newTask: number
    setTaskList: Dispatch<SetStateAction<TasksType>>
    setNewTask: Dispatch<SetStateAction<number>>
    handleAdd: (start?: boolean) => void
    handleDrop: (prevTitle: string, title: string, taskIndex: number, hoverIndex: number) => void
}

const Tasks = ({ title, taskList, newTask, setNewTask, setTaskList, handleAdd, handleDrop }: Props) => {

    return (
        <div className={style.container}>
            {
                taskList?.map((task, index) => <TaskCard key={task + title + index} title={title} task={task}
                    index={index} setTaskList={setTaskList} newTask={newTask} setNewTask={setNewTask} handleDrop={handleDrop} />)
            }
            <div className={style.new} onClick={() => handleAdd()}>
                <span className={style.text}>
                    <PlusOutlined className={style.plus} /> New
                </span>
            </div>
        </div>
    );
};

export default Tasks;