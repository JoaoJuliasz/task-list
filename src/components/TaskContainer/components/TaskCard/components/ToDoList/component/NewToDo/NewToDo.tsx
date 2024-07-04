import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { Button, Input } from "antd";
import { Todo } from "../../../../../../../../types/Task.type";

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
        <div style={{ display: 'flex' }}>
            <Input onChange={handleChange} value={item} onKeyPress={handleKeyChange} />
            <Button onClick={handleClick}>+</Button>
        </div>
    );
};

export default NewToDo;