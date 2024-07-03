import { Dropdown } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useTaskListContext } from "../../hooks/useTaskListContext";
import UpdateTitleInput from "../UpdateTitleInput/UpdateTitleInput";
import style from './updateTitle.module.css'

type Props = {
    index: number
    currTitle: string
    titleClassName: string
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const UpdateTitle = ({ index, currTitle, titleClassName, setTasksTitles }: Props) => {

    const { setTaskList } = useTaskListContext()

    const handleClick = (title: string) => {
        setTasksTitles(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev))
            updtPrev[index] = title
            localStorage.setItem('tasksTitles', JSON.stringify(updtPrev))
            return updtPrev
        })
        setTaskList(prev => {
            const updtPrev = JSON.parse(JSON.stringify(prev))
            updtPrev[title] = updtPrev[currTitle]
            delete updtPrev[currTitle]
            localStorage.setItem('task-manager', JSON.stringify(updtPrev))
            return updtPrev
        })
    }

    const renderDropdown = () => (
        <UpdateTitleInput value={currTitle} handleClick={handleClick} />
    )

    return (
        <Dropdown dropdownRender={renderDropdown} trigger={['click']}
            destroyPopupOnHide={true}>
            <div className={style.titleWrapper}>
                <h5 className={titleClassName}>{currTitle}</h5>
            </div>
        </Dropdown>
    );
};

export default UpdateTitle;