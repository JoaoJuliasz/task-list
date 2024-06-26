import { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard from "../TaskCard/TaskCard";

import style from './tasks.module.css';
import { Task, Tasks as TasksType } from "../../../../types/Task.type";

type Props = {
    title: string
    taskList: Task[]
    newTask: number
    setTaskList: Dispatch<SetStateAction<TasksType>>
    setNewTask: Dispatch<SetStateAction<number>>
    handleAdd: (title: string, start?: boolean | undefined) => void
}

const Tasks = ({ title, taskList, newTask, setNewTask, setTaskList, handleAdd }: Props) => {
    return (
        <div className={style.container}>
            {
                taskList?.length > 0 ?
                    taskList?.map((task, index) => <TaskCard key={task + title + index}
                        title={title} task={task}
                        index={index} setTaskList={setTaskList} newTask={newTask}
                        setNewTask={setNewTask} />)
                    :
                    <TaskCard title={title} task={{} as Task} empty={true}
                        index={0} setTaskList={setTaskList} newTask={newTask}
                        setNewTask={setNewTask} />
            }
            <div className={style.new} onClick={() => handleAdd(title)}>
                <span className={style.text}>
                    <PlusOutlined className={style.plus} /> New
                </span>
            </div>
        </div>
    );
};

export default Tasks;