import React, { useRef, useState } from "react";
import { validateTodoTitle } from "../../utils/todos";

// css
import classes from "./NewTodo.module.css";

// interfaces
import type { TodoRequest } from "../../models/TodoInterfaces";

// components
import { addTodo } from "../../api/TodosApi";

const NewTodo: React.FC<{ onTodoAdded: () => void }> = (props) => {
    const todoInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');


    const addTodoHandler = (text: string) => {
        const newTodos: TodoRequest = {
            title: text,
            isDone: false
        };

        addTodo(newTodos).then(() => {
            props.onTodoAdded();
        });
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (!todoInputRef.current) { return; }
        const enteredText = todoInputRef.current.value;

        let errorTitle = validateTodoTitle(enteredText);
        if (errorTitle) {
            setError(errorTitle);
            return;
        }

        addTodoHandler(enteredText);
        setError('');
        todoInputRef.current.value = '';
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label>Todo text</label>
            <input type="text" ref={todoInputRef} />
            <label className={classes.error_message}>{error}</label>
            <button>Add</button>
        </form>
    )
}

export default NewTodo;