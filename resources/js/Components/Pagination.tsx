import React from "react";
import { PaginationProps } from "@/types";

export default function Pagination({
    todosPerPage,
    totalTodos,
    paginateFront,
    paginateBack,
    currentPage,
    className,
}: PaginationProps) {
    const indexOfLastTodo = currentPage * todosPerPage;

    const allTodosShown = indexOfLastTodo >= totalTodos;

    return (
        <div className={`py-2 ${className}`}>
            <div>
                <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                        {currentPage * todosPerPage - 10}
                    </span>{" "}
                    to
                    <span className="font-medium">
                        {" "}
                        {currentPage * todosPerPage}{" "}
                    </span>
                    of
                    <span className="font-medium"> {totalTodos} </span>
                    results
                </p>
            </div>
            <nav className="block"></nav>
            <div>
                <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer"
                    aria-label="Pagination"
                >
                    <button
                        onClick={paginateBack}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer ${
                            currentPage === 1
                                ? "disabled:opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        <span>Previous</span>
                    </button>

                    <button
                        onClick={paginateFront}
                        disabled={allTodosShown}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                            allTodosShown
                                ? "disabled:opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        <span>Next</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}
