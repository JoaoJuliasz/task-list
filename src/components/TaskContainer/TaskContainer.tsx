import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

type Props = {
    title: string
}

const TaskContainer = ({ title }: Props) => {
    const [taskList, setTaskList] = useState<string[]>([])
    const [newTask, setNewTask] = useState<number>(-1)

    const handleAdd = (start?: boolean) => {
        setTaskList(prev => start ? ['', ...prev] : [...prev, ''])

        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = taskManager[title] ? (start ? ['', ...taskList] : [...taskList, '']) : ['']
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
        setNewTask(start ? 0 : taskManager[title].length - 1)

    }

    useEffect(() => {
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        setTaskList(taskManager[title] ?? [])
    }, [])

    return (
        <div>
            <Header title={title} taskList={taskList} setTaskList={setTaskList} handleAdd={handleAdd} />
            <Tasks title={title} taskList={taskList} setTaskList={setTaskList} handleAdd={handleAdd}
                newTask={newTask} setNewTask={setNewTask} />
        </div>
    );
};

export default TaskContainer;