import React, { useState } from "react";

type LayoutType = Parameters<typeof Form>[0]['layout'];

// interfaces
import type { TodoRequest } from "../../models/TodoInterfaces";

// components
import { addTodo } from "../../api/TodosApi";
import { Button, Form, Input } from "antd";
import { getMessageError } from "../../utils/todos";

const NewTodo: React.FC<{ onTodoAdded: () => void }> = (props) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('inline');
    const todoName = Form.useWatch('todoName', form);

    const addTodoHandler = (text: string) => {
        const newTodos: TodoRequest = {
            title: text,
            isDone: false
        };

        addTodo(newTodos).then(() => {
            props.onTodoAdded();
        }).catch((error) => {
            alert(getMessageError(error))
        });
    }

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const submitHandler = () => {
        addTodoHandler(todoName);
    }

    return (
        <Form
            layout='inline'
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            onFinish={submitHandler}
        >
            <Form.Item
                label="Todos name"
                name='todoName'
                initialValue={``}
                rules={[
                    {
                        validator(_, value) {
                            let titleLength = value.trim().length;
                            if (titleLength === 0) {
                                return Promise.reject(new Error('Это поле не может быть пустым!'));
                            }

                            if (titleLength < 2) {
                                return Promise.reject(new Error('Минимальная длина текста 2 символа!'));
                            }

                            if (titleLength > 64) {
                                return Promise.reject(new Error('Максимальная длина текста 64 символа!'));
                            }

                            return Promise.resolve();
                        },
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