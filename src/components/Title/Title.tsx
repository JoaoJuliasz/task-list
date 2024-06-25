import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SearchTasks from "./components/SearchTasks/SearchTasks";
import style from "./title.module.css";

type Props = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
};

const Title = ({ search, setSearch }: Props) => {
    const [title, setTitle] = useState<string>("");

    const titleRef = useRef<HTMLHeadingElement>(null);

    const handleChange = (event: ChangeEvent<HTMLHeadingElement>) => {
        const value = event.target.textContent || "";
        setTitle(value);
        localStorage.setItem("task-manager-title", value);
    };

    useEffect(() => {
        const storageTitle = localStorage.getItem("task-manager-title") || "";
        setTitle(storageTitle);
    }, []);


    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.textContent = title;
        }
    }, [title]);

    return (
        <div className={style.container}>
            <h3
                ref={titleRef}
                className={style.title}
                dir="ltr"
                contentEditable={true}
                onInput={handleChange}
                data-text="Untitled"
            />
            <SearchTasks search={search} setSearch={setSearch} />
        </div>
    );
};

export default Title;
