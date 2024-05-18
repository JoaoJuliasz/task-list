import { ChangeEvent, Dispatch, KeyboardEvent, MutableRefObject, SetStateAction } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import style from '../../taskCard.module.css'


type Props = {
    currTask: string
    textAreaRef: MutableRefObject<HTMLTextAreaElement | null>
    validation: boolean
    setCurrTask: Dispatch<SetStateAction<string>>
    handleEdit: (value: boolean) => void
}

const TaskInput = ({ currTask, textAreaRef, validation, setCurrTask, handleEdit }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setCurrTask(value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleEdit(false)
        }
    }

    return validation ?
        <ReactTextareaAutosize className={style.text}
            value={currTask}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={textAreaRef} placeholder="untitled"
            autoFocus={true}
        /> :
        (<div className={style.notEdit}>
            <span style={{ opacity: !currTask ? 0.4 : 1 }}>{currTask || 'untitled'}</span>
        </div>
        );
};

export default TaskInput;