import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Task, Tasks } from "../types/Task.type";

const emptyTask: Task = { name: '', type: 'simple' }

export const useTask = (setTaskList: Dispatch<SetStateAction<Tasks>>) => {
    const [newTask, setNewTask] = useState<number>(-1)

    const updateListOnDrop = useCallback((prevTitle: string, title: string, taskIndex: number, hoverIndex: number) => {
        setTaskList(prev => {
            const updatedTaskList = { ...prev }  // Shallow copy of the task list

            if (!updatedTaskList[prevTitle] || !updatedTaskList[title]) {
                return prev
            }

            const movedTask = updatedTaskList[prevTitle][taskIndex]
            updatedTaskList[prevTitle] = [
                ...updatedTaskList[prevTitle].slice(0, taskIndex),
                ...updatedTaskList[prevTitle].slice(taskIndex + 1)
            ]

            updatedTaskList[title] = [
                ...updatedTaskList[title].slice(0, hoverIndex),
                movedTask,
                ...updatedTaskList[title].slice(hoverIndex)
            ]

            localStorage.setItem('task-manager', JSON.stringify(updatedTaskList))

            return updatedTaskList
        })
    }, [])

    const updateTask = useCallback((title: string, index: number, currTask: Task) => {
        setTaskList(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev[title]))
            updtPrev[index] = currTask
            return { ...prev, [title]: updtPrev }
        })
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title][index] = currTask
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }, [])

    const addTask = useCallback((title: string, start?: boolean) => {
        let taskSize = -1
        setTaskList(prev => {
            const updtList: Tasks = JSON.parse(JSON.stringify(prev))
            updtList[title] = updtList[title] ?
                (start ? [emptyTask, ...updtList[title]] : [...updtList[title], emptyTask]) : [emptyTask]
            taskSize = updtList[title].length - 1
            localStorage.setItem("task-manager", JSON.stringify(updtList))
            return updtList
        })
        setNewTask(prev => start ? 0 : taskSize)
    }, [])

    const deleteOne = (title: string, index: number) => {
        setTaskList(prev => {
            const updt = JSON.parse(JSON.stringify(prev))
            updt[title].splice(index, 1)
            localStorage.setItem("task-manager", JSON.stringify(updt))
            return { ...updt }
        })
    }

    const deleteAll = useCallback((title: string) => {
        if (window.confirm(`Are you sure you want to remove all tasks from "${title}"?`)) {
            setTaskList(prev => ({ ...prev, [title]: [] }))
            const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
            taskManager[title] = []
            localStorage.setItem("task-manager", JSON.stringify(taskManager))
        }
    }, [])

    return { newTask, setNewTask, updateListOnDrop, updateTask, addTask, deleteOne, deleteAll }

};