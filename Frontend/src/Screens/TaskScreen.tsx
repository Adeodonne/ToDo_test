import React, {useEffect, useState} from "react";

interface TaskItem {
    id: string;
    text: string;
}

const TaskPage = () => {
    const [text, setText] = useState<string>("");
    const [tasks, setTasks] = useState<TaskItem[]>([]);

    const getAllTasks = async () => {
        const tasksResponse = await fetch(process.env.REACT_APP_API_URL + "/Task");
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
    }

    const handleButtonClick = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "/Task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                await getAllTasks();
            } else {
                console.error("Failed to send request");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            await getAllTasks();
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleButtonClick}>Send Request</button>

            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;