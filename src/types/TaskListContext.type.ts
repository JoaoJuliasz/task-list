import { Tasks } from "./Task.type"

export type TaskListContext = {
    taskList: Tasks
    setTaskList: React.Dispatch<React.SetStateAction<Tasks>>
}