import { Dispatch, SetStateAction } from "react";
import { List } from "antd";
import { Todo } from "../../../../../../types/Task.type";
import ToDoItem from "./component/ToDoItem/ToDoItem";

type Props = {
    todoList: Todo[]
    setTaskTodoList: Dispatch<SetStateAction<Todo[]>>
}

const ToDoList = ({ todoList, setTaskTodoList }: Props) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={todoList}
            renderItem={(todo, index) => <ToDoItem todo={todo} index={index} setTaskTodoList={setTaskTodoList} />}
        />
    );
};

export default ToDoList;