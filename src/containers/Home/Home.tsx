import { useState } from "react";
import Title from "../../components/Title/Title";
import TaskList from "../Tasks/TaskList";

import style from './home.module.css'

const Home = () => {
    const [search, setSearch] = useState<string>("")

    return (
        <div className={style.container}>
            <Title search={search} setSearch={setSearch} />
            <TaskList search={search} />
        </div>
    );
};

export default Home;