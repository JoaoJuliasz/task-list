import { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard from "../TaskCard/TaskCard";

import style from './tasks.module.css';
import { Task } from "../../../../types/Task.type";
import { useTaskListContext } from "../../../../hooks/useTaskListContext";

type Props = {
    title: string
    newTask: number
    setNewTask: Dispatch<SetStateAction<number>>
    handleAdd: (title: string, start?: boolean | undefined) => void
}

const Tasks = ({ title, newTask, setNewTask, handleAdd }: Props) => {

    const { tasks } = useTaskListContext()

    return (
        <div className={style.container}>
            {
                tasks[title]?.length > 0 ?
                    tasks[title]?.map((task, index) => <TaskCard key={task + title + index}
                        title={title} task={task}
                        index={index} newTask={newTask}
                        setNewTask={setNewTask} />)
                    :
                    <TaskCard title={title} task={{} as Task} empty={true}
                        index={0} newTask={newTask}
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