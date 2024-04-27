import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types";

export default function Dashboard({ auth }: PageProps) {
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
                            />

                            <div className="flex items-center">
                                <input type="button" value=""></input>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="p-4 bg-blacklike text-white rounded-r-md"
                                />
                            </div>
                        </div>
                        <input
                            type="button"
                            value="New task"
                            className="py-2 px-8 border-solid border-2 border-blacklike rounded-r-md rounded-l-md bg-black text-white"
                        />
                    </div>
                </>
            }
        >
            <Head title="Welcome" />

            <div
                className="py-12 flex flex-col justify-center md:items-center"
                id="todo-container"
            >
                {todos.map((todo: Todo) => (
                    <div
                        key={todo.id}
                        className="md:w-3/4 pt-2 pb-1 px-4 my-3 ml-1 rounded text-lg bg-mediumpurple flex justify-between items-center"
                    >
                        <span>{todo.text}</span>
                        <div className="flex justify-center items-center gap-2">
                            <button type="button">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="p-2 rounded border-transparent border-2 w-4 h-4 bg-indianred"
                                />
                            </button>
                            <button type="button">
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

let todos: Todo[] = [
    { id: 1, text: "Go to the shop" },
    { id: 2, text: "Read a book" },
    { id: 3, text: "Learn React" },
];
