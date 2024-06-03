
import { Dispatch, SetStateAction } from 'react';
import { PlusOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";

import MenuComponent from '../../../../../Menu/Menu'

import { useTask } from '../../../../../../hooks/useTask';
import { Tasks } from '../../../../../../types/Task.type';

type Props = {
    title: string
    setTaskList: Dispatch<SetStateAction<Tasks>>
    handleAdd: (title: string, start?: boolean | undefined) => void
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const Menu = ({ title, setTaskList, handleAdd, setTasksTitles }: Props) => {

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
        <MenuComponent children={[
            <div onClick={() => handleAdd(title, true)}><PlusOutlined /> Add</div>,
            <div onClick={handleClear}><ClearOutlined /> Clear</div>,
            <div onClick={handleDeleteColumn}><DeleteOutlined /> Remove Column</div>,
        ]} />
    );
};

export default Menu;