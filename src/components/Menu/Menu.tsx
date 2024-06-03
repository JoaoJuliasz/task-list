import { ReactNode, useRef, useState } from 'react';
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";

import { DashOutlined } from "@ant-design/icons";

import style from './menu.module.css'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

type Props = {
    children: ReactNode[]
    task ?: boolean
}

const Menu = ({ children, task }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

    const ref = useRef(null);

    return (
        <div className={style.container}>
            <div className={`${style.openMenu} ${isOpen ? style.isOpen : ''} ${task ? style.isTask : ''}`} ref={ref} {...anchorProps}>
                <DashOutlined />
            </div>
            <ControlledMenu
                {...hoverProps}
                menuClassName={style.menu}
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
            >
                {children.map(item => (
                    <MenuItem className={({ hover }) => (hover ? style.itemHover : "") + ` ${style.item}`}>{item}</MenuItem>
                ))}
            </ControlledMenu>
        </div>
    )
};

export default Menu;