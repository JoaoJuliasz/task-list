import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { Button, Input } from "antd";
import { Todo } from "../../../../../../../../types/Task.type";

import style from './newTodo.module.css'

type Props = {
    setTaskTodoList: Dispatch<SetStateAction<Todo[]>>
}

const NewToDo = ({ setTaskTodoList }: Props) => {
    const [item, setItem] = useState<string>("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setItem(value)
    }

    const handleKeyChange = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && item) {
            handleClick()
        }
    }

    const handleClick = () => {
        setTaskTodoList(prev => {
            return [...prev, { item, done: false }]
        })
        setItem("")
    }


    return (
        <div className={style.container}>
            <Input className={style.input} onChange={handleChange} placeholder="Type new todo"
                value={item} onKeyPress={handleKeyChange} />
            <Button className={style.button} onClick={handleClick}>+</Button>
        </div>
    );
};

export default NewToDo;