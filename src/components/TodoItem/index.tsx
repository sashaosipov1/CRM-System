import { useState } from "react";
import type React from "react";

// css
import classes from "./TodoItem.module.css";
import 'font-awesome/css/font-awesome.min.css';

// api methods
import { removeTodo, completeOrChangeTodo } from "../../api/TodosApi";

// interfaces
import type { TodoRequest } from "../../models/TodoInterfaces";
import { validateTodoTitle } from "../../utils/todos";

const TodoItem: React.FC<{ text: string, onUpdate: () => void, todoId: number, isDone: boolean }> = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [changeValue, setChangeValue] = useState('');
    const [error, setError] = useState('');

    const startEditTodo = () => {
        setIsEdit(true);
    }

    const removeTodoItem = (todoId: number) => {
        removeTodo(todoId).then(() => {
            props.onUpdate();
        });
    }

    const makeCompletedTodoItem = (done: boolean, todoId: number) => {
        const newTodos: TodoRequest = {
            isDone: done
        };

        completeOrChangeTodo(newTodos, todoId).then(() => {
            props.onUpdate();
        });
    }

    const skipChangesAndEndEditTodo = () => {
        setChangeValue('');
        setError('');
        setIsEdit(false);
    }

    const saveTodoChanges = (done: boolean, value: string, todoId: number) => {
        const newTodos: TodoRequest = {
            title: value,
            isDone: done
        };

        completeOrChangeTodo(newTodos, todoId).then(() => {
            props.onUpdate();
        });
    }

    const todoFormSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        let errorTitle = validateTodoTitle(changeValue);
        if (errorTitle) {
            setError(errorTitle);
            return;
        }

        saveTodoChanges(props.isDone, changeValue, props.todoId);
        skipChangesAndEndEditTodo();
    }

    return (
        !isEdit ? <li className={classes.item}>
            <div className={classes.fs_20} onClick={makeCompletedTodoItem.bind(null, !props.isDone, props.todoId)}>{props.isDone ? <i className="fa fa-check-square-o"></i> : <i className="fa fa-square-o"></i>}</div>
            <div className={`${classes.options} ${classes.options2}`}>
                <div className={props.isDone ? classes.text_done : classes.text}>{props.text}</div>
            </div>
            <div className={classes.options}>
                <div className={`${classes.fs_20} ${classes.edit}`} onClick={startEditTodo}><i className="fa fa-pencil-square-o"></i></div>
                <div className={`${classes.fs_20} ${classes.trash}`} onClick={removeTodoItem.bind(null, props.todoId)}><i className="fa fa-trash"></i></div>
            </div>
        </li> : <li className={classes.item}>
            <form onSubmit={todoFormSubmitHandler} className={classes.editForm}>
                <input type="text" value={changeValue} onChange={(event) => setChangeValue(event.target.value)} />
                <label className={classes.error_message}>{error}</label>
                <div className={classes.options}>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={skipChangesAndEndEditTodo}>Отмена</button>
                </div>
            </form>
        </li>
    )
}

export default TodoItem;