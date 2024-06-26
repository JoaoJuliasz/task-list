import { Button, Input, List } from "antd";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Todo } from "../../../../../../types/Task.type";
import ToDoItem from "./component/ToDoItem/ToDoItem";

type Props = {
    todoList: Todo[]
    setTaskTodoList: Dispatch<SetStateAction<Todo[]>>
}

const ToDoList = ({ todoList, setTaskTodoList }: Props) => {
    const [item, setItem] = useState<string>("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setItem(value)
    }

    const handleClick = () => {
        setTaskTodoList(prev => {
            prev.push({ item, done: false })
            return [...prev]
        })
        setItem("")
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Input onChange={handleChange} value={item} />
                <Button onClick={handleClick}>+</Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={todoList}
                renderItem={(todo, index) => <ToDoItem todo={todo} index={index} setTaskTodoList={setTaskTodoList} />}
            />
        </div >
    );
};

export default ToDoList;