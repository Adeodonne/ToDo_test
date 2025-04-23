import React, {useCallback, useEffect, useState} from "react";

interface TaskItem {
    id: string;
    text: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const TaskPage = () => {
    const [text, setText] = useState<string>("");
    const [tasks, setTasks] = useState<TaskItem[]>([]);

    const getAllTasks = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/Task`);
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTasks(data);
        } catch (err: any) {
            console.log(err.message);
        }
    }, []);

    const handleButtonClick = async () => {
        try {
            const response = await fetch(`${API_URL}/Task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text}),
            });

            if (!response.ok) throw new Error("Failed to add task");

            setText("");
            await getAllTasks();
        } catch (err: any) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleButtonClick} disabled={!text.trim()}>
                Send Request
            </button>

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
