import React, { useEffect, useState } from 'react';

const TodoList = () => {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [filterTask, setFilterTask] = useState([]);

    useEffect(() => {
        let tempArr = [];

        if (filter === "all") {
            tempArr = tasks;
        } else if (filter === "complete") {
            tempArr = tasks.filter((task) => task.isDone);
        } else {
            tempArr = tasks.filter((task) => !task.isDone);
        }

        setFilterTask(tempArr);
    }, [tasks, filter]);

    const handleClick = () => {
        if (text.trim() === "") {
            alert("Enter any task");
            return;
        }

        const newTask = {
            id: Date.now(),
            taskName: text,
            isDone: false
        };

        setTasks([...tasks, newTask]);
        setText("");
    };

    const markAsComplete = (id) => {
        const updatedTask = tasks.map((task) =>
            task.id === id ? { ...task, isDone: true } : task
        );

        setTasks(updatedTask);
    };

    const deleteTask = (id) => {
        const deletedTask = tasks.filter((task) => {
            return task.id !== id
        })
        setTasks(deletedTask);
    }


    return (
        <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h1 className="text-center mb-8 text-4xl font-bold text-slate-800">Todo List ☑️</h1>

                <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto mb-6">
                    <div className="relative w-full sm:w-8/12">
                        <input
                            type="text"
                            value={text}
                            className="w-full px-4 py-2 text-base text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add New Tasks Here ✏️"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={handleClick}
                    >
                        Add task
                    </button>
                </div>

                {tasks.length > 0 ? (
                    <div>
                        <div className="flex flex-wrap gap-3 justify-center my-6">
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ${filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-indigo-100"}`}
                                onClick={() => setFilter("all")}
                            >
                                All tasks
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ${filter === "complete" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-100"}`}
                                onClick={() => setFilter("complete")}
                            >
                                Complete tasks
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm ${filter === "incomplete" ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-red-100"}`}
                                onClick={() => setFilter("incomplete")}
                            >
                                Incomplete tasks
                            </button>
                        </div>

                        <div className="overflow-x-auto my-10 sm:rounded-lg">
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3">Task name</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterTask.length > 0 ? (
                                        filterTask.map((task) => (
                                            <tr key={task.id} className="bg-white border-t hover:bg-gray-50 transition">
                                                <th
                                                    scope="row"
                                                    className={`px-6 py-4 font-medium whitespace-nowrap ${task.isDone ? "text-gray-500 line-through" : "text-gray-900"}`}
                                                >
                                                    {task.taskName}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {task.isDone ? (
                                                        <span className="text-green-600 font-semibold">Task completed ✅</span>
                                                    ) : (
                                                        <button
                                                            className="font-medium text-blue-600 hover:underline"
                                                            onClick={() => markAsComplete(task.id)}
                                                        >
                                                            Mark as completed
                                                        </button>
                                                    )}
                                                    <button className='ml-7 text-red-600 hover:underline font-semibold' onClick={() => {
                                                        deleteTask(task.id);
                                                    }}>Delete Task 🗑️</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="text-center py-6 text-gray-600">
                                                <h2 className="text-gray-700 font-bold text-xl">No tasks found for this filter 😶</h2>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center my-10">
                        <img src="/not-any-task.png" alt="No Task Found" className="h-96" />
                    </div>
                )}
            </div>
        </div >
    );
};

export default TodoList;
