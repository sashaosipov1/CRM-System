import React from "react";
import TodoItem from "../TodoItem";
import classes from "./Todos.module.css";

import { type Todo } from "../../models/TodoInterfaces";

const Todos: React.FC<{items: Todo[], triggerUpdateData: () => void}> = (props) => {
    return (
        <ul className={classes.todos}>
            {props.items.map(item => <TodoItem key={item.id} text={item.title} todoId={item.id} isDone={item.isDone} triggerUpdateData={props.triggerUpdateData} />)}
        </ul>
    )
}

export default Todos;