export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Todo {
    id?: number;
    text: string;
    isDone: boolean | number;
    user_id: number | string;
    created_at?: Date;
    updated_at?: Date;
}

export interface PaginationProps {
    todosPerPage: number;
    totalTodos: number;
    paginateFront: () => void;
    paginateBack: () => void;
    currentPage: number;
    className: string;
}

export interface TodosProps {
    todos: Todo[];
    loading: boolean;
    markAsDeleted: (id: number) => Promise<void>;
    markAsFinished: (id: number) => Promise<void>;
    searchQuery: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
