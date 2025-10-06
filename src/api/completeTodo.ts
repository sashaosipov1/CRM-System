import type { TodoRequest } from '../models/todoRequest';

async function completeTodo(todo: TodoRequest, todoId: number) {
    try {
        await fetch('https://easydev.club/api/v1/todos/' + todoId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
    } catch (error) {

    }
}

export default completeTodo