import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faTrash,
    faCheck,
    faClipboard,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types";
import Modal from "@/Components/Modal";
import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
    CSSProperties,
} from "react";
import { fetchDataFromLocalStorage, stringifyAndStore } from "@/Util";
import useKeyPress from "@/hooks/useKeyPress";
import axios from "axios";

import { ClipLoader } from "react-spinners";
import Pagination from "@/Components/Pagination";
import Todos from "@/Components/Todos";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#7fbc95",
    borderWidth: "5px",
};

export default function Dashboard({ auth }: PageProps) {
    const [modalState, setModalState] = useState(false);
    const [deletedModalState, setDeletedModalState] = useState(false);

    const [todos, setTodos] = useState<Todo[]>([]);
    const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);

    const [errors, setError] = useState("");
    const [input, setInput] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(event?.target?.value);

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ed7461");

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(10);

    // Get current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos
        .slice(indexOfFirstTodo, indexOfLastTodo)
        .filter((todo) =>
            todo.text.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

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

        setDeletedTodos([...deletedTodos, todos[todoIndex]]);
        await axios.delete(`/todos/${auth.user.id}/${todos[todoIndex].id}`);

        setTodos(updatedTodos);
    };

    const getTodos = async () => await axios.get(`todos/${auth.user.id}`);

    const getDeletedTodos = async () =>
        await axios.get(`todos/${auth.user.id}/deleted`);

    useKeyPress("Enter", () => {
        if (modalState) {
            onSubmit(new Event("submit"));
        }
    });

    useEffect(() => {
        setLoading(true);
        getTodos()
            .then((res) => {
                setTodos(res.data);
                setLoading(false);
            })
            .catch((err) => {
                const todos = fetchDataFromLocalStorage("todos");

                if (!todos) {
                    console.error(err);
                    return;
                }
                console.error(err);
                setTodos(todos);
            });
        getDeletedTodos()
            .then((res) => setDeletedTodos(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => stringifyAndStore("todos", todos), [todos]);

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
                className="py-12 flex flex-col md:items-center h-screen items-center"
                id="todo-container"
            >
                <Todos
                    loading={loading}
                    todos={currentTodos}
                    markAsDeleted={markAsDeleted}
                    markAsFinished={markAsFinished}
                    searchQuery={searchQuery}
                />
                <Pagination
                    todosPerPage={todosPerPage}
                    totalTodos={todos.length}
                    paginateBack={paginateBack}
                    paginateFront={paginateFront}
                    currentPage={currentPage}
                    className="absolute bottom-8 flex items-center justify-center flex-col gap-1"
                />
            </div>

            <button
                onClick={() => setDeletedModalState(true)}
                type="button"
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>

            <Modal
                show={deletedModalState}
                closeable
                onClose={() => setDeletedModalState(false)}
            >
                <div className="flex flex-col justify-center items-center gap-3 p-3 relative">
                    <FontAwesomeIcon
                        className="absolute left-0 top-0 p-3 m-1 rounded bg-darkseagreen cursor-pointer"
                        icon={faXmark}
                        onClick={() => setDeletedModalState(false)}
                    />
                    <span className="bg-darkseagreen p-3 rounded text-2xl">
                        Deleted Todos
                    </span>
                    {deletedTodos.map((todo) => {
                        return (
                            <div
                                key={todo.id}
                                className={`pt-2 pb-1 px-4 rounded text-lg bg-mediumpurple flex justify-between items-center`}
                            >
                                <span>{todo.text}</span>
                            </div>
                        );
                    })}

                    {!deletedTodos.length && <span>No deleted todos.</span>}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
