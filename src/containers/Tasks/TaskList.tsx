import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import { Tasks } from "../../types/Task.type";

const TaskList = () => {
    const [taskList, setTaskList] = useState<Tasks>({})

    useEffect(() => {
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        setTaskList(taskManager)
    }, [])

    return (
        <div style={{ width: '100%', display: "flex", justifyContent: 'space-around', margin: 20 }}>
            <DndProvider backend={HTML5Backend}>
                <TaskContainer title="To Do" tasks={taskList["To Do"]} setTaskList={setTaskList} />
                <TaskContainer title="Doing" tasks={taskList["Doing"]} setTaskList={setTaskList} />
                <TaskContainer title="Done" tasks={taskList["Done"]} setTaskList={setTaskList} />
            </DndProvider>
        </div>

    );
};

export default TaskList;