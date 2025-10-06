import React from "react";
import Todo from "./TodoItem";
import classes from "../styles/Todos.module.css";

import { type ITodo } from "../models/todo";

const Todos: React.FC<{items: ITodo[], passLoading: (status: boolean) => void}> = (props) => {
    return (
        <ul className={classes.todos}>
            {props.items.map(item => <Todo key={item.id} text={item.title} todoId={item.id} isDone={item.isDone} passLoading={props.passLoading} />)}
        </ul>
    )
}

export default Todos;