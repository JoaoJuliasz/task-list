import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}

const SearchTasks = ({ search, setSearch }: Props) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const handleAbleSearch = (value: boolean) => {
        setIsSearch(value)
    }

    const handleBlur = () => {
        handleAbleSearch(false)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            {isSearch ?
                <input placeholder="Type to search..."
                    onBlur={handleBlur} autoFocus={true}
                    onChange={handleChange} value={search} />
                :
                <SearchOutlined onClick={() => handleAbleSearch(true)} />
            }
        </div>
    );
};

export default SearchTasks;