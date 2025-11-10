// components
import Todos from '../components/Todos';
import NewTodo from '../components/NewTodo';
import StatusChecker from '../components/StatusChecker';

// api methods
import { getTodos } from '../api/TodosApi';

// interfaces
import type { Todo, TodoInfo, MetaResponse } from '../models/TodoInterfaces';

// hooks
import { useState, useEffect } from 'react';

import { getMessageError } from '../utils/todos';
import { REFRESH_TIME } from '../constants';

const TodoPage: React.FC = () => {
  const [statuses, setStatuses] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0
  });
  const [status, setStatus] = useState<keyof TodoInfo>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    updateAndSetData();
  }, [status])

  useEffect(() => {
    const updateInterval = setInterval(updateAndSetData, REFRESH_TIME);

    return () => clearInterval(updateInterval)
  }, [status])

  const updateAndSetData = () => {
    getTodos(status).then((res: MetaResponse<Todo, TodoInfo>) => {
      if (!res.info) { return; }

      setTodos(res.data);
      setStatuses(res.info);
    }).catch((error) => {
      alert(getMessageError(error))
    })
  }

  return (
    <>
      <NewTodo onTodoAdded={updateAndSetData} />
      <StatusChecker onCheckerClick={setStatus} statuses={statuses} status={status} />
      <Todos items={todos} onUpdate={updateAndSetData} />
    </>
  )
}

export default TodoPage