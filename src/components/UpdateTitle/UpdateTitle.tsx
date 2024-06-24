import { Dropdown } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Tasks } from "../../types/Task.type";
import UpdateTitleInput from "./components/UpdateTitleInput/UpdateTitleInput";
import style from './updateTitle.module.css'

type Props = {
    index: number
    currTitle: string
    titleClassName: string
    setTaskList: Dispatch<SetStateAction<Tasks>>
    setTasksTitles: Dispatch<SetStateAction<string[]>>
}

const UpdateTitle = ({ index, currTitle, titleClassName, setTasksTitles, setTaskList }: Props) => {

    const renderDropdown = () => (
        <UpdateTitleInput index={index} title={currTitle} setTasksTitles={setTasksTitles} setTaskList={setTaskList} />
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