import { Dispatch, SetStateAction } from 'react';
import { Dropdown, MenuProps } from 'antd';

import { DashOutlined } from "@ant-design/icons";

import style from './menu.module.css'

type Props = {
    items: MenuProps['items']
    task?: boolean
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ items, task, isOpen, setIsOpen }: Props) => {

    const handleVisibleChange = (flag: boolean) => {
        setIsOpen(flag);
    };

    return (
        <div className={style.container}>
            <Dropdown
                className={style.menu}
                menu={{ items }}
                onOpenChange={handleVisibleChange}
                trigger={["click"]}
            >
                <div className={`${style.openMenu} ${isOpen ? style.isOpen : ''} ${task ? style.isTask : ''}`}>
                    <DashOutlined />
                </div>
            </Dropdown>
        </div>
    )
};

export default Menu;