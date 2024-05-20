import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SearchTasks from "./components/SearchTasks/SearchTasks";
import style from "./title.module.css"

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const Title = ({ search, setSearch }: Props) => {
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
            <SearchTasks search={search} setSearch={setSearch} />
        </div>
    );
};

export default Title;