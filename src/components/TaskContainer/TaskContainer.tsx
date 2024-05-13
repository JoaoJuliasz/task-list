import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Tasks as TasksType } from "../../types/Task.type";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

type Props = {
    title: string
    tasks: string[]
    index: number
    setTaskList: Dispatch<SetStateAction<TasksType>>
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

const TaskContainer = ({ title, tasks, index, setTaskList, moveItem }: Props) => {
    const [newTask, setNewTask] = useState<number>(-1)
    const ref = useRef(null);
    const [, drag] = useDrag({
        type: "ITEM",
        item: { type: "ITEM", index }
    });

    const [, drop] = useDrop({
        accept: "ITEM",
        hover(item: { type: string, index: number }) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

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
        <div ref={ref}>
            <Header title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd} />
            <Tasks title={title} taskList={tasks} setTaskList={setTaskList} handleAdd={handleAdd}
                newTask={newTask} setNewTask={setNewTask} handleDrop={handleDrop} />
        </div>
    );
};

export default TaskContainer;