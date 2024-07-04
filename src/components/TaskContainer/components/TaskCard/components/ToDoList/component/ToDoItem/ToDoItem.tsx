import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Checkbox, CheckboxProps, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { Todo } from '../../../../../../../../types/Task.type';

import style from './todoItem.module.css'

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

    const handleUpdateTodo: CheckboxProps['onChange'] = (e) => {
        const done = e.target.checked
        setTaskTodoList(prev => {
            const todoList = [...prev]
            todoList[index] = { ...todoList[index], done }
            return todoList
        });
    };

    useEffect(() => {
        if (textRef.current) {
            textRef.current.textContent = todo.item;
        }
    }, [todo.item]);

    return (
        <List.Item className={style.container}>
            <div className={style.todo}>
                <Checkbox className={style.checkbox} checked={todo.done} onChange={handleUpdateTodo} />
                <span className={`${style.title} ${todo.done ? style.done : ''}`} ref={textRef} dir="ltr" contentEditable="true" onInput={handleChange} />
            </div>
            <DeleteOutlined onClick={handleRemove} />
        </List.Item>
    );
};

export default ToDoItem;