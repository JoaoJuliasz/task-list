import { ChangeEvent, Dispatch, KeyboardEvent, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import style from '../../taskCard.module.css'


type Props = {
    currTask: string
    setCurrTask: Dispatch<SetStateAction<string>>
    handleEdit: (value: boolean) => void
}

const TaskInput = ({ currTask, setCurrTask, handleEdit }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setCurrTask(value)
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
        value={currTask}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        placeholder="untitled"
    />;
};

export default TaskInput;