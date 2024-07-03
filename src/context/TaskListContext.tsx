import { createContext } from "react";
import { TaskListContext as TaskListContextType } from "../types/TaskListContext.type";

const TaskListContext = createContext<TaskListContextType| null>(null)

const TaskListProvider = TaskListContext.Provider

export { TaskListContext, TaskListProvider }