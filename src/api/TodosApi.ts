import type { MetaResponse, TodoInfo, Todo, TodoRequest } from '../models/TodoInterfaces';
import { getMessageError } from '../utils/todos';

export async function addTodo(todo: TodoRequest): Promise<void> {
    try {
        await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function completeOrChangeTodo(todo: TodoRequest, todoId: number): Promise<void> {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function removeTodo(todoId: number): Promise<void> {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }
}

export async function getTodos(status: keyof TodoInfo, result: MetaResponse<Todo, TodoInfo>): Promise<MetaResponse<Todo, TodoInfo>> {
    try {
        await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
            .then((response) => response)  // response headers
            .then((res) => res.json())
            .then(res => {
                result = res;
            })
    } catch (error: unknown) {
        throw new Error(getMessageError(error));
    }

    return result;
}