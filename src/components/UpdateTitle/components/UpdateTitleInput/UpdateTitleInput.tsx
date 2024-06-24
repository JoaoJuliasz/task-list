import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import style from './updateTitleInput.module.css'
import { Tasks } from '../../../../types/Task.type';

type Props = {
    index: number
    title: string
    setTasksTitles: Dispatch<SetStateAction<string[]>>
    setTaskList: Dispatch<SetStateAction<Tasks>>
}


const UpdateTitleInput = ({ index, title, setTasksTitles, setTaskList }: Props) => {
    const [currTitle, setCurrTitle] = useState<string>(title)

    const inputRef = useRef<HTMLInputElement>()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrTitle(event.target.value)
    }

    const handleClick = () => {
        setTasksTitles(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev))
            updtPrev[index] = currTitle
            localStorage.setItem('tasksTitles', JSON.stringify(updtPrev))
            return updtPrev
        })
        setTaskList(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev))
            updtPrev[currTitle] = updtPrev[title]
            delete updtPrev[title]
            localStorage.setItem('task-manager', JSON.stringify(updtPrev))
            return updtPrev
        })
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className={style.container}>
            <Input className={style.input} value={currTitle} ref={inputRef} onChange={handleChange} />
            <Button className={style.button} onClick={handleClick} size="small">Done</Button>
        </div>
    );
};

export default UpdateTitleInput;