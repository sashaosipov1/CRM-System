async function removeTodo(todoId: number) {
    try {
        await fetch('https://easydev.club/api/v1/todos/' + todoId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    } catch (error) {

    }
}

export default removeTodo