import React from "react";
import { List } from 'antd';
import TodoItem from "../TodoItem";

import { type Todo } from "../../models/TodoInterfaces";

const Todos: React.FC<{ items: Todo[], onUpdate: () => void }> = (props) => {
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={props.items}
            renderItem={(item) => (
                <TodoItem key={item.id} text={item.title} todoId={item.id} isDone={item.isDone} onUpdate={props.onUpdate} />
            )}
        />
    )
}

export default Todos;