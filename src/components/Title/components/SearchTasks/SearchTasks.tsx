import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";

import style from './searchTasks.module.css'

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const SearchTasks = ({ search, setSearch }: Props) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleAbleSearch = (value: boolean) => {
        setIsSearch(value)
        if (value) {
            inputRef.current?.focus()
        }
    }

    const handleBlur = () => {
        if (!search) {
            handleAbleSearch(false)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleClear = () => {
        setSearch("")
        handleAbleSearch(false)
    }

    return (
        <div className={`${style.container} ${isSearch ? style.isSearch : ''}`}>
            <SearchOutlined onClick={() => handleAbleSearch(true)} />
            <div className={style.wrapper}>
                <input className={`${style.input} ${isSearch ? style.show : ''}`}
                    ref={inputRef}
                    placeholder="Type to search..."
                    onBlur={handleBlur} onChange={handleChange} value={search} />
                {search ?
                    <CloseCircleOutlined className={style.close} onClick={handleClear} />
                    : null}
            </div>
        </div>
    );
};

export default SearchTasks;