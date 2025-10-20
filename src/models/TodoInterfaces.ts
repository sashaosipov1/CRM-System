export interface Todo {
    id: number;
    title: string;
    created: string; // ISO date string 
    isDone: boolean;
}

export interface MetaResponse<T, N> {
    data: T[]
    info?: N
    meta: {
        totalAmount: number
    }
}

export type TodoRequest = Partial<Pick<Todo, "title" | "isDone">>;

export interface TodoInfo {
    all: number
    completed: number
    inWork: number
}