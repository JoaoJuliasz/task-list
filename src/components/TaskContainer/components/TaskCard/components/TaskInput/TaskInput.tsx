import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";
import { Task } from "../../../../../../types/Task.type";

import style from '../../taskCard.module.css'

type Props = {
    currTask: Task
    setCurrTask: Dispatch<SetStateAction<Task>>
    handleEdit: (value: boolean) => void
}

const TaskInput = ({ currTask, setCurrTask, handleEdit }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.value
        setCurrTask(prev => ({...prev, name}))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleEdit(false)
        }
    }

    useEffect(() => {
        const textarea = textareaRef?.current;
        if (textarea) {
            const length = textarea?.value.length;
            textarea.focus();
            textarea.setSelectionRange(length, length);
        }
    }, []);

    return <ReactTextareaAutosize className={style.text}
        value={currTask.name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        placeholder="untitled"
        onBlur={() => handleEdit(false)}
    />;
};

export default TaskInput;