// components
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';
import StatusCheker from './components/StatusCheker';

// api methods
import getTodos from './api/getTodos';

// interfaces
import type { ITodo } from './models/todo';
import type { ITodoInfo } from './models/status';

// hooks
import { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [statuses, setStatuses] = useState<ITodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0
  });
  const [status, setStatus] = useState('all');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos(status).then((res) => {
      setTodos(res.data);
      setStatuses(res.info!);
      setIsLoading(false);
    })
  }, [isLoading])

  const ChekerClickHandler = (status: string) => {
    setStatus(status);
    setIsLoading(true);
  }

  const passLoading = (status: boolean) => {
    setIsLoading(status);
  }

  return (
    <>
      <NewTodo passLoading={passLoading} />
      <StatusCheker onChekerClick={ChekerClickHandler} statuses={statuses} status={status} />
      <Todos items={todos} passLoading={passLoading} />
    </>
  )
}

export default App
