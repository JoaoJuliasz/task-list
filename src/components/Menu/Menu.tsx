import { ReactNode, useRef, useState } from 'react';
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";

import { DashOutlined } from "@ant-design/icons";

import style from './menu.module.css'

type Props = {
    children: ReactNode[]
}

const Menu = ({ children }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

    const ref = useRef(null);

    return (
        <div className={style.container}>
            <div className={`${style.openMenu} ${isOpen ? style.isOpen : ''}`} ref={ref} {...anchorProps}>
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