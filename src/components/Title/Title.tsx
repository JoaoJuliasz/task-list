import { ChangeEvent, useState } from "react";
import style from "./title.module.css"

const Title = () => {
    const [title, setTitle] = useState<string>("Task Manager")
    const [editTitle, setEditTitle] = useState<boolean>(false)

    const handleClick = (value: boolean) => {
        setEditTitle(value)
    }

    const handleChange = (element: ChangeEvent<HTMLInputElement>) => {
        setTitle(element.target.value)
    }

    return (
        <div className={style.container}>
            {editTitle ?
                <input value={title} className={style.titleChange}
                    onChange={handleChange} autoFocus
                    onBlur={() => title && handleClick(false)} placeholder="Untitled" />
                :
                <h3 className={style.title} onClick={() => handleClick(true)}>{title}</h3>
            }
        </div>
    );
};

export default Title;