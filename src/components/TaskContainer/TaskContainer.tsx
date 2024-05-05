import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

type Props = {
    title: string
}

const TaskContainer = ({ title }: Props) => {
    const [taskList, setTaskList] = useState<string[]>([])

    const handleAdd = (start?: boolean) => {
        setTaskList(prev => {
            if (start) {
                return ['ue', ...prev]
            }
            return [...prev, 'oi']
        })

        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = taskManager[title] ? ['ue', ...taskList] : ['']
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }

    useEffect(() => {
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        setTaskList(taskManager[title] ?? [])
    }, [])

    return (
        <div>
            <Header title={title} taskList={taskList} setTaskList={setTaskList} handleAdd={handleAdd} />
            <Tasks title={title} taskList={taskList} setTaskList={setTaskList} handleAdd={handleAdd} />
        </div>
    );
};

export default TaskContainer;