
import { Dispatch, SetStateAction } from 'react';
import { PlusOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";

import MenuComponent from '../../../../../Menu/Menu'

import { useTask } from '../../../../../../hooks/useTask';
import { Tasks } from '../../../../../../types/Task.type';
import { MenuProps } from 'antd';

type Props = {
    title: string
    setTaskList: Dispatch<SetStateAction<Tasks>>
    handleAdd: (title: string, start?: boolean | undefined) => void
    setTasksTitles: Dispatch<SetStateAction<string[]>>
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ title, setTaskList, handleAdd, setTasksTitles, isOpen, setIsOpen }: Props) => {

    const { deleteAll } = useTask(setTaskList)

    const handleClear = () => deleteAll(title)

    const handleDeleteColumn = () => {
        if (window.confirm("Are you sure you want to delete this column?")) {
            setTasksTitles(prev => {
                const updtPrev = prev.filter(value => value !== title)
                localStorage.setItem("tasksTitles", JSON.stringify(updtPrev))
                return updtPrev
            })
        }
    }

    return (
        <MenuComponent items={[
            { key: '1', label: (<div onClick={() => handleAdd(title, true)}>Add</div>), itemIcon: <PlusOutlined /> },
            { key: '2', label: (<div onClick={handleClear}>Clear</div>), itemIcon: <ClearOutlined /> },
            { key: '3', label: (<div onClick={handleDeleteColumn}> Remove Column</div>), itemIcon: <DeleteOutlined /> },
        ] as MenuProps['items']} isOpen={isOpen} setIsOpen={setIsOpen}/>
    );
};

export default Menu;