import { Dispatch, SetStateAction } from "react"
import { Tasks } from "./Task.type"

export type TaskListContext = {
    taskList: Tasks
    setTaskList: Dispatch<SetStateAction<Tasks>>
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}