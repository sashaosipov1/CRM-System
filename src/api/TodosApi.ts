import type { MetaResponse, TodoInfo, Todo, TodoRequest } from '../models/TodoInterfaces';
import { getMessageError } from '../utils/todos';
import apiInstance from './axiosInstance';

export function addTodo(todo: TodoRequest): Promise<void> {
    return apiInstance.post('todos', todo)
        .then(() => void 0)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function completeOrChangeTodo(todo: TodoRequest, todoId: number): Promise<void> {
    return apiInstance.put(`todos/${todoId}`, todo)
        .then(() => void 0)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function removeTodo(todoId: number): Promise<void> {
    return apiInstance.delete(`todos/${todoId}`)
        .then(() => void 0)
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}

export function getTodos(status: keyof TodoInfo): Promise<MetaResponse<Todo, TodoInfo>> {
    return apiInstance.get('todos', {
        params: {
            filter: status
        }
    })
        .then(response => {
            const result: MetaResponse<Todo, TodoInfo> = response.data;
            console.log(result);
            return result;
        })
        .catch((error: unknown) => {
            throw new Error(getMessageError(error));
        });
}