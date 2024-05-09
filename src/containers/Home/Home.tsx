import Title from "../../components/Title/Title";
import TaskList from "../Tasks/TaskList";

const Home = () => {
    return (
        <div style={{ width: '100%', display: "flex", flexDirection: 'column' }}>
            <Title />
            <TaskList />
        </div>
    );
};

export default Home;