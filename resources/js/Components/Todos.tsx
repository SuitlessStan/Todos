import React, { CSSProperties, useState } from "react";
import { ClipLoader } from "react-spinners";
import { TodosProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#7fbc95",
    borderWidth: "5px",
};

const Todos = ({
    todos,
    loading,
    markAsDeleted,
    markAsFinished,
    searchQuery,
}: TodosProps) => {
    let [color, setColor] = useState("#ed7461");

    if (loading) {
        return (
            <ClipLoader
                className="h-full w-full flex items-center justify-center absolute inset-x-2"
                color={color}
                loading={loading}
                cssOverride={override}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        );
    }

    return (
        <div className="md:w-3/4 w-full mx-auto overflow-y-scroll overflow-x-hidden">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className={`w-full pt-2 pb-1 px-4 mt-3 ml-1 rounded text-lg bg-mediumpurple flex justify-between items-center ${todo.text}`}
                >
                    <span className={`${todo.isDone ? "line-through" : ""}`}>
                        {todo.text}
                    </span>
                    <div className="flex justify-center items-center gap-2">
                        <span className="hidden md:inline-block">
                            {" "}
                            {new Date(todo.created_at as Date)
                                .toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })
                                .replace(",", "")}
                        </span>
                        <span className="hidden lg:inline-block">
                            {", "}
                            {new Date(
                                todo.created_at as Date
                            ).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
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
                            onClick={() => markAsFinished(todo.id as number)}
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
            {todos.length === 0 && searchQuery.length > 0 && (
                <p className="text-xl">No results found.</p>
            )}
        </div>
    );
};

export default Todos;
