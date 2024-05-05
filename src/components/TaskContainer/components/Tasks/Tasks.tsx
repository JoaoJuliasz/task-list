import { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import TaskCard from "../../../TaskCard/TaskCard";

type Props = {
    title: string
    taskList: string[]
    setTaskList: Dispatch<SetStateAction<string[]>>
    handleAdd: (start?: boolean) => void
}

const Tasks = ({ title, taskList, setTaskList, handleAdd }: Props) => {
    return (
        <div style={{ width: '260px' }}>
            {
                taskList.map((task, index) => <TaskCard title={title} task={task} index={index} setTaskList={setTaskList} />)
            }
            <span style={{ cursor: 'pointer', display: 'flex' }} onClick={() => handleAdd()}>
                <PlusOutlined style={{ margin: '0 5px' }} /> New
            </span>
        </div>
    );
};

export default Tasks;