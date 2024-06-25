import { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import UpdateTitleInput from "../../components/UpdateTitleInput/UpdateTitleInput";
import { useMessage } from "../../hooks/useMessage";
import { Tasks } from "../../types/Task.type";

import style from './taskList.module.css'

type Props = {
    search: string
}

const TaskList = ({ search }: Props) => {
    const [taskList, setTaskList] = useState<Tasks>({})
    const [tasksTitles, setTasksTitles] = useState<string[]>(["To Do", "Doing", "Done"])
    const [open, setOpen] = useState<boolean>(false)


    const { contextHolder, displayMessage } = useMessage()

    const filteredItems = useMemo(() => {
        const result: Tasks = JSON.parse(JSON.stringify(taskList))
        tasksTitles.forEach(title => {
            if (result[title]) {
                result[title] = result[title].filter(item => item.toLowerCase().includes(search.toLowerCase()))
            }
        })
        return result
    }, [search, taskList])

    const handleVisibility = (visible: boolean) => setOpen(visible)

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const newItems = [...tasksTitles];
        const [removed] = newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, removed);
        setTasksTitles(newItems);
        localStorage.setItem('tasksTitles', JSON.stringify(newItems))
    };

    const handleClick = (value: string) => {
        if (!value) {
            displayMessage("error", "Column's title cannot be empty")
            return
        }

        if (tasksTitles.includes(value)) {
            displayMessage("error", `Column "${value}" already exists!`)
            return
        }
        setTaskList(prev => ({ ...prev, [value]: [] }))
        setTasksTitles(prev => {
            const newTitles = [...prev, value]
            localStorage.setItem('tasksTitles', JSON.stringify(newTitles))
            return newTitles
        })
        setOpen(() => false)
    }

    const renderDropdown = () => (
        <UpdateTitleInput value="" handleClick={handleClick} />
    )

    useEffect(() => {
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        setTaskList(taskManager)
        const tasksTitlesStorage = localStorage.getItem('tasksTitles')
        if (tasksTitlesStorage) {
            setTasksTitles(JSON.parse(tasksTitlesStorage))
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <DndProvider backend={HTML5Backend}>
                    {
                        tasksTitles.map((title, index) =>
                            <TaskContainer key={title + index} title={title}
                                tasks={filteredItems[title]} index={index} setTaskList={setTaskList} moveItem={moveItem} setTasksTitles={setTasksTitles} />
                        )
                    }
                </DndProvider>
                <div className={style.add}>
                    <Dropdown dropdownRender={renderDropdown} trigger={['click']} onOpenChange={handleVisibility}
                        destroyPopupOnHide={true} open={open}>
                        <PlusOutlined />
                    </Dropdown>
                </div>
            </div>
            {contextHolder}
        </div>
    );
};

export default TaskList;