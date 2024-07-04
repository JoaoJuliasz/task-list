import { Dispatch, SetStateAction } from "react";
import { List } from "antd";
import { Todo } from "../../../../../../types/Task.type";
import NewToDo from "./component/NewToDo/NewToDo";
import ToDoItem from "./component/ToDoItem/ToDoItem";

type Props = {
    todoList: Todo[]
    setTaskTodoList: Dispatch<SetStateAction<Todo[]>>
}

const ToDoList = ({ todoList, setTaskTodoList }: Props) => {
    return (
        <div>
            <NewToDo setTaskTodoList={setTaskTodoList} />
            <List
                itemLayout="horizontal"
                dataSource={todoList}
                renderItem={(todo, index) => <ToDoItem todo={todo} index={index} setTaskTodoList={setTaskTodoList} />}
            />
        </div >
    );
};

export default ToDoList;