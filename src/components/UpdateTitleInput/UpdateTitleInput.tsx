import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import style from './updateTitleInput.module.css'

type Props = {
    value: string
    placeholder?: string
    handleClick: (value: string) => void
}


const UpdateTitleInput = ({ value, placeholder, handleClick }: Props) => {
    const [currValue, setCurrValue] = useState<string>(value)

    const inputRef = useRef<HTMLInputElement>()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrValue(event.target.value)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className={style.container}>
            <Input className={style.input} value={currValue} ref={inputRef} onChange={handleChange} placeholder={placeholder}/>
            <Button className={style.button} onClick={() => handleClick(currValue)} size="small">Done</Button>
        </div>
    );
};

export default UpdateTitleInput;