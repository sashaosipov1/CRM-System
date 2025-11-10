import type { MetaResponse, TodoInfo, Todo, TodoRequest, TodoInfoKey } from '../models/TodoInterfaces';
import { getMessageError } from '../utils/todos';
import apiInstance from './axiosInstance';

export function addTodo(todo: TodoRequest): Promise<Todo> {
    return apiInstance.post<Todo>('todos', todo)
        .then((response) => response.data)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function updateTodo(todo: TodoRequest, todoId: number): Promise<Todo> {
    return apiInstance.put<Todo>(`todos/${todoId}`, todo)
        .then(response => response.data)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function removeTodo(todoId: number): Promise<Todo> {
    return apiInstance.delete<Todo>(`todos/${todoId}`)
        .then(response => response.data)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function getTodos(status: TodoInfoKey): Promise<MetaResponse<Todo, TodoInfo>> {
    return apiInstance.get('todos', {
        params: {
            filter: status
        }
    })
        .then(response => {
            const result: MetaResponse<Todo, TodoInfo> = response.data;
            return result;
        })
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}