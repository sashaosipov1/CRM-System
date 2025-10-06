import React, { useRef, useState } from "react";

// css
import classes from "../styles/NewTodo.module.css";

// interfaces
import type { TodoRequest } from "../models/todoRequest";

// components
import addTodo from "../api/addTodo";

const NewTodo: React.FC<{ passLoading: (status: boolean) => void }> = (props) => {
    const TodoInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');


    const AddTodoHandler = (text: string) => {
        const newTodos: TodoRequest = {
            title: text,
            isDone: false
        };

        addTodo(newTodos).then(() => {
            props.passLoading(true);
        });
    }

    const submHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = TodoInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            setError('Это поле не может быть пустым');
            return;
        }

        if (enteredText.trim().length === 1) {
            setError('Минимальная длина текста 2 символа');
            return;
        }

        if (enteredText.trim().length > 64) {
            setError('Максимальная длина текста 64 символа');
            return;
        }

        AddTodoHandler(enteredText);
        setError('');
        TodoInputRef.current!.value = '';
    }

    return (
        <form onSubmit={submHandler} className={classes.form}>
            <label>Todo text</label>
            <input type="text" ref={TodoInputRef} />
            <label className={classes.error_message}>{error}</label>
            <button>Add</button>
        </form>
    )
}

export default NewTodo;