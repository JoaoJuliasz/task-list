import { Dispatch, SetStateAction, useState } from "react";
import { Tasks as TasksType } from "../../types/Task.type";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

type Props = {
    title: string
    tasks: string[]
    setTaskList: Dispatch<SetStateAction<TasksType>>
}

const TaskContainer = ({ title, tasks, setTaskList }: Props) => {
    const [newTask, setNewTask] = useState<number>(-1)

    const handleAdd = (start?: boolean) => {
        setTaskList(prev => ({ ...prev, [title]: start ? ['', ...prev[title]] : [...prev[title], ''] }))

        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = taskManager[title] ? (start ? ['', ...tasks] : [...tasks, '']) : ['']
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
        setNewTask(start ? 0 : taskManager[title].length - 1)

    }

    const handleDrop = (prevTitle: string, title: string, task: string, taskIndex: number) => {
        setTaskList(prev => {
            const updtTaskList: TasksType = JSON.parse(JSON.stringify(prev))
            updtTaskList[prevTitle].splice(taskIndex, 1)
            updtTaskList[title] = updtTaskList[title] ? [...updtTaskList[title], task] : [task]
            return ({ ...prev, [title]: updtTaskList[title], [prevTitle]: updtTaskList[prevTitle] })
        })

        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[prevTitle].splice(taskIndex, 1)
        taskManager[title] = taskManager[title] ? [...taskManager[title], task] : [task]
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }

    return (
        <div>
            <Header title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd} />
            <Tasks title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd}
                newTask={newTask} setNewTask={setNewTask} handleDrop={handleDrop} />
        </div>
    );
};

export default TaskContainer;