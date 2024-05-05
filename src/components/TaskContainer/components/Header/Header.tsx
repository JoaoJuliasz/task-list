import { Dispatch, SetStateAction, useState } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'


type Props = {
    title: string
    taskList: string[]
    handleAdd: (start?: boolean) => void
    setTaskList: Dispatch<SetStateAction<string[]>>
}

const Header = ({ title, taskList, handleAdd, setTaskList }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [headerTitle, setHeaderTitle] = useState<string>(title)
    const [showOptions, setShowOptions] = useState<boolean>(false)

    const handleOptions = (value: boolean) => {
        setShowOptions(value)
    }

    const handleDelete = () => {
        setTaskList([])
        const taskManager = JSON.parse(localStorage.getItem('task-manager') || "{}")
        taskManager[title] = []
        localStorage.setItem("task-manager", JSON.stringify(taskManager))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}
            onMouseEnter={() => handleOptions(true)}
            onMouseLeave={() => handleOptions(false)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {edit ?
                    <input value={headerTitle} 
                    autoFocus onBlur={() => setEdit(false)}
                    style={{background: 'transparent', border: 'none', outline: 'none'}}
                    onChange={e => setHeaderTitle(e.target.value)} />
                    :
                    <h5 style={{ margin: '0 10px 0 0' }} onClick={() => setEdit(true)}>{headerTitle}</h5>}
                {!edit ? <span>{taskList.length}</span> : null}
            </div>
            {showOptions ? <div>
                <PlusOutlined style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleAdd(true)} />
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleDelete} />
            </div> : null}
        </div>
    );
};

export default Header;