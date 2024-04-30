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

let tasks: Todo[] = [
    { id: 1, text: "Go to the shop", isDone: false },
    { id: 2, text: "Read a book", isDone: false },
    { id: 3, text: "Learn React", isDone: false },
    { id: 4, text: "Read a book", isDone: false },
    { id: 5, text: "Write a blog post", isDone: false },
    { id: 6, text: "Exercise for 30 minutes", isDone: false },
    { id: 7, text: "Call a friend", isDone: false },
    { id: 8, text: "Finish the assignment", isDone: false },
];

export default function Dashboard({ auth }: PageProps) {
    const [modalState, setModalState] = useState(false);

    const [todos, setTodos] = useState<Todo[]>(tasks);
    const [errors, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(event?.target?.value);

    const closeModal = () => setModalState(false);
    const openModal = () => setModalState(true);

    const onSubmit = (e: Event | FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task = (e.target as HTMLFormElement).elements.todo.value;

        addNewTask({
            id: Date.now(),
            text: task,
            isDone: false,
        });

        closeModal();
    };

    const addNewTask = (todo: Todo) => {
        if (todos.some((task) => task.text === todo.text)) {
            console.log("A todo with the same text already exists.");
            setError("A todo with the same text already exists.");
            return;
        }

        setTodos((prevState) => [...prevState, todo]);
    };

    const markAsFinished = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            setError(`Todo with id ${id} not found`);
            console.error(`Todo with id ${id} not found`);
            return;
        }

        const updatedTodos = [...todos];

        updatedTodos[todoIndex] = {
            ...updatedTodos[todoIndex],
            isDone: true,
        };

        setTodos(updatedTodos);
    };

    const markAsDeleted = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            setError(`Todo with id ${id} not found`);
            console.error(`Todo with id ${id} not found`);
            return;
        }

        const updatedTodos = todos.filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            className="px-2 py-2 text-xl my-2 mb-4 "
                            type="text"
                            name="todo"
                            id="todo"
                            placeholder="add a new todo !"
                        />
                        <div className="flex justify-between">
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
                className="py-12 flex flex-col justify-center md:items-center h-full"
                id="todo-container"
            >
                {filteredTodos.map((todo: Todo) => (
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
                                onClick={() => markAsDeleted(todo.id)}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="p-2 rounded border-transparent border-2 w-4 h-4 bg-indianred"
                                />
                            </button>
                            <button
                                onClick={() => markAsFinished(todo.id)}
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
            </div>
        </AuthenticatedLayout>
    );
}
