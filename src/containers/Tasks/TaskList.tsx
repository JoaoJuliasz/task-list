import { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import { Tasks } from "../../types/Task.type";

import style from './taskList.module.css'

type Props = {
    search: string
}

const TaskList = ({ search }: Props) => {
    const [taskList, setTaskList] = useState<Tasks>({})
    const [tasksTitles, setTasksTitles] = useState<string[]>(["To Do", "Doing", "Done"])

    const filteredItems = useMemo(() => {
        const result: Tasks = JSON.parse(JSON.stringify(taskList))
        tasksTitles.forEach(title => {
            if (result[title]) {
                result[title] = result[title].filter(item => item.toLowerCase().includes(search.toLowerCase()))
            }
        })
        return result
    }, [search, taskList])

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const newItems = [...tasksTitles];
        const [removed] = newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, removed);
        setTasksTitles(newItems);
        localStorage.setItem('tasksTitles', JSON.stringify(newItems))
    };

    useEffect(() => {
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        setTaskList(taskManager)
        const tasksTitlesStorage = localStorage.getItem('tasksTitles')
        if (tasksTitlesStorage) {
            setTasksTitles(JSON.parse(tasksTitlesStorage))
        }
    }, [])

    return (
        <div className={style.container}>
            <DndProvider backend={HTML5Backend}>
                {
                    tasksTitles.map((title, index) =>
                        <TaskContainer key={title + index} title={title}
                            tasks={filteredItems[title]} index={index} setTaskList={setTaskList} moveItem={moveItem} />
                    )
                }
            </DndProvider>
        </div>

    );
};

export default TaskList;