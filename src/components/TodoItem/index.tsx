import React, { useState } from 'react';
import { Button, List, Form, Input } from 'antd';
import '@ant-design/v5-patch-for-react-19';

import classes from "./TodoItem.module.css";
import 'font-awesome/css/font-awesome.min.css';

import { removeTodo, updateTodo } from "../../api/TodosApi";

import type { TodoRequest } from "../../models/TodoInterfaces";
import { getMessageError } from '../../utils/todos';
import { TODO_TITLE_MAX_LENGTH, TODO_TITLE_MIN_LENGTH } from '../../constants';

const TodoItem: React.FC<{ text: string, onUpdate: () => void, todoId: number, isDone: boolean }> = (props) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [form] = Form.useForm();
    const todoName = Form.useWatch('todoName', form);

    const startEditTodo = () => {
        setIsEdit(true);
    }

    const removeTodoItem = (todoId: number) => {
        removeTodo(todoId).then(() => {
            props.onUpdate();
        }).catch((error) => {
            alert(getMessageError(error))
        });
    }

    const makeCompletedTodoItem = (done: boolean, todoId: number) => {
        const newTodos: TodoRequest = {
            isDone: done
        };

        updateTodo(newTodos, todoId).then(() => {
            props.onUpdate();
        }).catch((error) => {
            alert(getMessageError(error))
        });
    }

    const skipChangesAndEndEditTodo = () => {
        form.resetFields();
        setIsEdit(false);
    }

    const saveTodoChanges = (done: boolean, value: string, todoId: number) => {
        const newTodos: TodoRequest = {
            title: value,
            isDone: done
        };

        updateTodo(newTodos, todoId).then(() => {
            props.onUpdate();
        }).catch((error) => {
            alert(getMessageError(error))
        });
    }

    const todoFormSubmitHandler = () => {
        saveTodoChanges(props.isDone, todoName, props.todoId);
        skipChangesAndEndEditTodo();
    }

    return (
        !isEdit ? <List.Item>
            <div className={classes.item}>
                <div className={classes.fs_20} onClick={makeCompletedTodoItem.bind(null, !props.isDone, props.todoId)}>{props.isDone ? <i className="fa fa-check-square-o"></i> : <i className="fa fa-square-o"></i>}</div>
                <div className={`${classes.options} ${classes.options2}`}>
                    <div className={props.isDone ? classes.text_done : classes.text}>{props.text}</div>
                </div>
                <div className={classes.options}>
                    <div className={`${classes.fs_20} ${classes.edit}`} onClick={startEditTodo}><i className="fa fa-pencil-square-o"></i></div>
                    <div className={`${classes.fs_20} ${classes.trash}`} onClick={removeTodoItem.bind(null, props.todoId)}><i className="fa fa-trash"></i></div>
                </div>
            </div>
        </List.Item> : <List.Item>
            <div className={classes.item}>
                <Form
                    layout='inline'
                    form={form}
                    onFinish={todoFormSubmitHandler}
                >
                    <Form.Item
                        label="Todos name"
                        name='todoName'
                        initialValue={``}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Это поле не может быть пустым!',
                            },
                            {
                                min: TODO_TITLE_MIN_LENGTH,
                                message: `Минимальная длина текста ${TODO_TITLE_MIN_LENGTH} символа!`,
                            },
                            {
                                max: TODO_TITLE_MAX_LENGTH,
                                message: `Максимальная длина текста ${TODO_TITLE_MAX_LENGTH} символа!`,
                            },
                        ]}>
                        <Input placeholder="Todos placeholder" type="text" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="button" onClick={skipChangesAndEndEditTodo}>Отмена</Button>
                    </Form.Item>
                </Form>
            </div>
        </List.Item>
    )
}

export default TodoItem;