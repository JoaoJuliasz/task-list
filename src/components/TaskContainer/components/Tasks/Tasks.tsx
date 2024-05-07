import { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard from "../TaskCard/TaskCard";

import style from './tasks.module.css';

type Props = {
    title: string
    taskList: string[]
    newTask: number
    setTaskList: Dispatch<SetStateAction<string[]>>
    setNewTask: Dispatch<SetStateAction<number>>
    handleAdd: (start?: boolean) => void
}

const Tasks = ({ title, taskList, newTask, setNewTask, setTaskList, handleAdd }: Props) => {
    return (
        <div className={style.container}>
            {
                taskList.map((task, index) => <TaskCard key={task + title + index} title={title} task={task}
                    index={index} setTaskList={setTaskList} newTask={newTask} setNewTask={setNewTask} />)
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