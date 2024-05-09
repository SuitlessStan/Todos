import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faTrash,
    faCheck,
    faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types";
import Modal from "@/Components/Modal";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchDataFromLocalStorage, stringifyAndStore } from "@/Util";
import axios from "axios";

export default function Dashboard({ auth }: PageProps) {
    const [modalState, setModalState] = useState(false);

    const [todos, setTodos] = useState<Todo[]>([]);
    const [errors, setError] = useState("");

    const [input, setInput] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(event?.target?.value);

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);

        setIsValid(input.trim().split(" ").length > 0);
    };

    const closeModal = () => {
        setModalState(false);
        setInput("");
        setError("");
    };
    const openModal = () => setModalState(true);

    const onSubmit = async (e: Event | FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.length === 0) {
            setError("Add a todo before submitting");
            return;
        }

        const task = (e.target as HTMLFormElement).elements.todo.value;

        await addNewTask({
            text: task,
            isDone: false,
            user_id: auth.user.id,
        });

        if (!errors.length) {
            closeModal();
        }
    };

    const addNewTask = async (todo: Todo) => {
        if (
            todos.some(
                (task) =>
                    task.text.toLowerCase().trim() ===
                    todo.text.toLowerCase().trim()
            )
        ) {
            console.log("A todo with the same text already exists.");
            setError("A todo with the same text already exists.");
            return;
        }

        const response = await axios.post(`/todos/${auth.user.id}`, {
            text: todo.text,
            isDone: todo.isDone,
            user_id: auth.user.id,
        });

        const { id } = response.data;

        setTodos((prevState) => [
            ...prevState,
            {
                id: id,
                text: todo.text,
                isDone: todo.isDone,
                user_id: auth.user.id,
            },
        ]);
    };

    const markAsFinished = async (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            setError(`Todo with id ${id} not found`);
            console.error(`Todo with id ${id} not found`);
            return;
        }

        const updatedTodos = [...todos];

        updatedTodos[todoIndex] = {
            ...updatedTodos[todoIndex],
            isDone: !updatedTodos[todoIndex].isDone,
        };

        setTodos(updatedTodos);

        await axios.put(`/todos/${auth.user.id}/${todos[todoIndex].id}`, {
            isDone: updatedTodos[todoIndex].isDone,
        });
    };

    const markAsDeleted = async (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            setError(`Todo with id ${id} not found`);
            console.error(`Todo with id ${id} not found`);
            return;
        }

        const updatedTodos = todos.filter((todo) => todo.id !== id);

        await axios.delete(`/todos/${auth.user.id}/${todos[todoIndex].id}`);

        setTodos(updatedTodos);
    };

    const getTodos = async () => await axios.get(`todos/${auth.user.id}`);

    // useEffect(() => {
    //     const todos = fetchDataFromLocalStorage("todos");

    //     if (!todos) {
    //         return;
    //     }
    //     setTodos(todos);
    // }, []);

    useEffect(() => {
        getTodos()
            .then((res) => setTodos(res.data))
            .catch((err) => console.error(err));
        // stringifyAndStore("todos", todos);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Things to do :
                    </h2>
                    <div className="flex justify-between mb-2 mt-4">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search for a task"
                                name="search"
                                id="search"
                                className="py-2 px-4 bg-sandybrown rounded-r-none rounded-l-md"
                                onChange={(e) => handleSearchQuery(e)}
                            />

                            <div className="flex items-center">
                                <input type="button" value="" />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="p-4 bg-blacklike text-white rounded-r-md hover:bg-white hover:text-black cursor-pointer"
                                />
                            </div>
                        </div>
                        <input
                            type="button"
                            value="New task"
                            onClick={openModal}
                            className="py-2 px-8 border-solid border-2 border-blacklike hover:bg-white hover:text-black rounded-r-md rounded-l-md bg-black text-white cursor-pointer"
                        />
                    </div>
                </>
            }
        >
            <Head title="Welcome" />
            <Modal show={modalState} closeable={true} onClose={closeModal}>
                <form action="/" method="post" onSubmit={(e) => onSubmit(e)}>
                    <div className="flex flex-col p-4">
                        <div className="float-left hidden md:block">
                            <span className="text-2xl sm:text-md p-2 rounded-md bg-darkseagreen">
                                What would you like to add ?
                            </span>
                        </div>
                        <div className="relative mt-8 md:mt-0">
                            <input
                                onClick={closeModal}
                                type="button"
                                value="X"
                                className="absolute right-0 bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none cursor-pointer"
                            />
                        </div>
                        <div className="relative py-5 items-center hidden md:flex">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-4 text-gray-400">
                                <FontAwesomeIcon icon={faClipboard} />
                            </span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <input
                            className={`px-2 py-2 text-xl my-2 mb-4 ${
                                (!isValid || errors) &&
                                "border-red-500 border-4"
                            }`}
                            type="text"
                            name="todo"
                            id="todo"
                            placeholder="add a new todo !"
                            value={input}
                            onChange={handleChange}
                        />
                        {!isValid && (
                            <p>
                                Please enter a valid and understandable
                                sentence.
                            </p>
                        )}
                        {errors && <p>{errors}</p>}
                        <div className="flex justify-between mt-2">
                            <input
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                value="Add"
                            />
                            <input
                                onClick={closeModal}
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                value="Cancel"
                            />
                        </div>
                    </div>
                </form>
            </Modal>

            <div
                className="py-12 flex flex-col md:items-center h-screen"
                id="todo-container"
            >
                {todos.map((todo: Todo) => (
                    <div
                        key={todo.id}
                        className={`md:w-3/4 pt-2 pb-1 px-4 mt-3 ml-1 rounded text-lg bg-mediumpurple flex justify-between items-center ${
                            todo.text ? "" : "hidden"
                        }`}
                    >
                        <span
                            className={`${todo.isDone ? "line-through" : ""}`}
                        >
                            {todo.text}
                        </span>
                        <div className="flex justify-center items-center gap-2">
                            <button
                                type="button"
                                onClick={() => markAsDeleted(todo.id as number)}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="p-2 rounded border-transparent border-2 w-4 h-4 bg-indianred"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    markAsFinished(todo.id as number)
                                }
                                type="button"
                            >
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="p-2 rounded border-transparent border-2 w-4 h-4 bg-darkseagreen"
                                />
                            </button>
                        </div>
                    </div>
                ))}
                {filteredTodos.length === 0 && searchQuery.length > 0 && (
                    <p className="text-xl">No results found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
