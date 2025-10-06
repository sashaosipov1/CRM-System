import type { MetaResponse } from '../models/metaResponse';
import type { ITodoInfo } from '../models/status';
import type { ITodo } from '../models/todo';

async function getTodos(status: string) {
    let result: MetaResponse<ITodo, ITodoInfo> = {
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0
        },
        meta: {
            totalAmount: 0
        }
    }

    try {
        await fetch('https://easydev.club/api/v1/todos?filter=' + status)
            .then((response) => response)  // response headers
            .then((res) => res.json())
            .then(res => {
                result = res;
            })
    } catch (error) {

    }

    return result;
}

export default getTodos