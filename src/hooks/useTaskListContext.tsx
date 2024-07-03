import { useContext } from 'react';
import { TaskListContext } from '../context/TaskListContext';

export const useTaskListContext = () => {
    const context = useContext(TaskListContext)!!

    return {
        tasks: context.taskList,
        setTaskList: context.setTaskList,
        setTasksTitles: context.setTasksTitles
    }
};