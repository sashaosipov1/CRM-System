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

  const updateAndSetData = () => {
    getTodos(status).then((res: MetaResponse<Todo, TodoInfo>) => {
      if (!res.info) { return; }

      setTodos(res.data);
      setStatuses(res.info);
    })
  }

  return (
    <>
      <NewTodo onTodoAdded={updateAndSetData} />
      <StatusChecker onCheckerClick={setStatus} statuses={statuses} status={status} />
      <Todos items={todos} triggerUpdateData={updateAndSetData} />
    </>
  )
}

export default TodoPage