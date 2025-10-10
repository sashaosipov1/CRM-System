import type { MetaResponse, TodoInfo, Todo, TodoRequest } from '../models/TodoInterfaces';

export async function addTodo(todo: TodoRequest): Promise<void> {
    try {
        await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
    } catch (error: any) {
        alert(error.message);
        throw new Error(error.message);
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
    } catch (error: any) {
        alert(error.message);
        throw new Error(error.message);
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
    } catch (error: any) {
        alert(error.message);
        throw new Error(error.message);
    }
}

export async function getTodos(status: keyof TodoInfo): Promise<MetaResponse<Todo, TodoInfo>> {
    let result: MetaResponse<Todo, TodoInfo> = {
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0
        },
        meta: {
            totalAmount: 0
        }
    };

    try {
        await fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
            .then((response) => response)  // response headers
            .then((res) => res.json())
            .then(res => {
                result = res;
            })
    } catch (error: any) {
        alert(error.message);
        throw new Error(error.message);
        
    }

    return result;
}