import Title from "../../components/Title/Title";
import TaskList from "../Tasks/TaskList";

import style from './home.module.css'

const Home = () => {
    return (
        <div className={style.container}>
            <Title />
            <TaskList />
        </div>
    );
};

export default Home;