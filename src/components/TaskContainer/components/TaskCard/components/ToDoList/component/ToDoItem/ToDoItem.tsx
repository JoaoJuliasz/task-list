import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { List } from 'antd';
import { Todo } from '../../../../../../../../types/Task.type';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
    todo: Todo
    index: number
    setTaskTodoList: Dispatch<SetStateAction<Todo[]>>
}

const ToDoItem = ({ todo, index, setTaskTodoList }: Props) => {
    const textRef = useRef<HTMLHeadingElement>(null);

    const handleChange = (event: ChangeEvent<HTMLSpanElement>) => {
        const item = event.target.textContent || "";
        setTaskTodoList(prev => {
            const todoList = [...prev]
            todoList[index] = { ...todoList[index], item }
            return todoList
        });
    };

    const handleRemove = () => {
        setTaskTodoList(prev => {
            const todoList = [...prev]
            todoList.splice(index, 1)
            return todoList
        });
    }

    useEffect(() => {
        if (textRef.current) {
            textRef.current.textContent = todo.item;
        }
    }, [todo.item]);

    return (
        <List.Item>
            <span ref={textRef} dir="ltr" contentEditable="true" onInput={handleChange} />
            <DeleteOutlined onClick={handleRemove}/>
        </List.Item>
    );
};

export default ToDoItem;