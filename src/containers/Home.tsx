import TaskContainer from "../components/TaskContainer/TaskContainer";
import Title from "../components/Title/Title";

const Home = () => {
    return (
        <div style={{ width: '100%', display: "flex", flexDirection: 'column' }}>
            <Title />
            <div style={{ width: '100%', display: "flex", justifyContent: 'space-around', margin: 20}}>
                <TaskContainer title="To Do"/>
                <TaskContainer title="Doing"/>
                <TaskContainer title="Done"/>
            </div>
        </div>
    );
};

export default Home;