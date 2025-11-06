import React from "react";

// interfaces
import type { TodoRequest } from "../../models/TodoInterfaces";

// components
import { addTodo } from "../../api/TodosApi";
import { Button, Form, Input } from "antd";
import { getMessageError } from "../../utils/todos";

const NewTodo: React.FC<{ onTodoAdded: () => void }> = (props) => {
    const [form] = Form.useForm();

    const submitHandler = (values: Record<string, any>) => {
        const newTodos: TodoRequest = {
            title: values.todoName,
            isDone: false
        };

        addTodo(newTodos).then(() => {
            props.onTodoAdded();
            form.resetFields();
        }).catch((error) => {
            alert(getMessageError(error))
        });
    }

    return (
        <Form
            layout='inline'
            onFinish={submitHandler}
            form={form}
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
                        min: 2,
                        message: 'Минимальная длина текста 2 символа!',
                    },
                    {
                        max: 64,
                        message: 'Максимальная длина текста 64 символа!',
                    },
                ]}>
                <Input placeholder="Todos placeholder" type="text" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>
        </Form>
    )
}

export default NewTodo;