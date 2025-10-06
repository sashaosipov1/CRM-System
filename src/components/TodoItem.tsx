import { useState } from "react";
import type React from "react";

// css
import classes from "../styles/TodoItem.module.css";
import 'font-awesome/css/font-awesome.min.css';

// api methods
import removeTodo from '../api/removeTodo';
import completeTodo from "../api/completeTodo";

// interfaces
import type { TodoRequest } from "../models/todoRequest";

const Todo: React.FC<{ text: string, passLoading: (status: boolean) => void, todoId: number, isDone: boolean }> = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [changeValue, setChangeValue] = useState('');
    const [error, setError] = useState('');

    const editTodo = () => {
        setIsEdit(true);
    }

    const removeTodoItem = (todoId: number) => {
        removeTodo(todoId).then(() => {
            props.passLoading(true);
        });
    }

    const makeCompleted = (done: boolean, title: string, todoId: number) => {
        const newTodos: TodoRequest = {
            title: title,
            isDone: done
        };

        completeTodo(newTodos, todoId).then(() => {
            props.passLoading(true);
        });
    }

    const saveChanges = () => {

        if (changeValue.trim().length === 0) {
            setError('Это поле не может быть пустым');
            return;
        }

        if (changeValue.trim().length === 1) {
            setError('Минимальная длина текста 2 символа');
            return;
        }

        if (changeValue.trim().length > 64) {
            setError('Максимальная длина текста 64 символа');
            return;
        }

        makeCompleted(props.isDone, changeValue, props.todoId);
        setIsEdit(false);
        setChangeValue('');
        setError('');
    }

    const skipChanges = () => {
        setIsEdit(false);
        setChangeValue('');
    }

    return (
        !isEdit ? <li className={classes.item}>
            <div className={classes.fs_20} onClick={makeCompleted.bind(null, !props.isDone, props.text, props.todoId)}>{props.isDone ? <i className="fa fa-check-square-o"></i> : <i className="fa fa-square-o"></i>}</div>
            <div className={`${classes.options} ${classes.options2}`}>
                <div className={props.isDone ? classes.text_done : classes.text}>{props.text}</div>
            </div>
            <div className={classes.options}>
                <div className={classes.fs_20} onClick={editTodo}><i className="fa fa-pencil-square-o"></i></div>
                <div className={classes.fs_20} onClick={removeTodoItem.bind(null, props.todoId)}><i className="fa fa-trash"></i></div>
            </div>
        </li> : <li className={classes.item}>
            <input type="text" value={changeValue} onChange={(event) => setChangeValue(event.target.value)} />
            <label className={classes.error_message}>{error}</label>
            <div className={classes.options}>
                <button onClick={saveChanges}>Сохранить</button>
                <button onClick={skipChanges}>Отмена</button>
            </div>
        </li>
    )
}

export default Todo;