import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";
import { Task } from "../../../../../../types/Task.type";

import style from '../../taskCard.module.css'

type Props = {
    condition: boolean
    currTask: Task
    setCurrTask: Dispatch<SetStateAction<Task>>
    handleEdit: (value: boolean) => void
}

const TaskInput = ({ condition, currTask, setCurrTask, handleEdit }: Props) => {
    const textareaRef = useRef<HTMLDivElement>(null);


    const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
        const name = e.target.textContent || "";
        setCurrTask(prev => ({ ...prev, name }))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleEdit(false)
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.textContent = currTask.name;
        }
    }, [currTask]);

    // useEffect(() => {
    //     if (textareaRef.current && condition) {
    //         const length = textareaRef.current.textContent?.length;
    //         textareaRef.current.focus();
    //         textareaRef.current.setSelectionRange(length, length);
    //     }
    // }, [condition])

    return (
        <div
            className={style.text}
            ref={textareaRef}
            contentEditable={condition}
            dir="ltr"
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => handleEdit(false)}
            data-text="untitled"
        />
    )
};

export default TaskInput;