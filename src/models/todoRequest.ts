import type { ITodo } from './todo';

export type TodoRequest = Partial<Omit<ITodo, "id" | "created">>;