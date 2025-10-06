import type { TodoRequest } from '../models/todoRequest';

async function addTodo(todo: TodoRequest) {
    try {
        await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
    } catch (error) {

    }
}

export default addTodo