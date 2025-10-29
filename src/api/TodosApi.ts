import type { MetaResponse, TodoInfo, Todo, TodoRequest } from '../models/TodoInterfaces';
import axios from 'axios';
import { getMessageError } from '../utils/todos';

export async function addTodo(todo: TodoRequest): Promise<void> {
    try {
        await axios.post(`https://easydev.club/api/v1/todos`, JSON.stringify(todo));
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function completeOrChangeTodo(todo: TodoRequest, todoId: number): Promise<void> {
    try {
        await axios.put(`https://easydev.club/api/v1/todos/${todoId}`, JSON.stringify(todo));
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function removeTodo(todoId: number): Promise<void> {
    try {
        await axios.delete(`https://easydev.club/api/v1/todos/${todoId}`);
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function getTodos(status: keyof TodoInfo): Promise<MetaResponse<Todo, TodoInfo>> {
    let result: MetaResponse<Todo, TodoInfo>;
    try {
        const response = await axios.get(`https://easydev.club/api/v1/todos?filter=${status}`);
        result = response.data;
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
    console.log(result);

    return result;
}