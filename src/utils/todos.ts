export const validateTodoTitle = (title: string): Promise<void> => {
    let titleLength = title.trim().length;
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
}

export const getMessageError = (error: unknown): string => {
    let result = '';
    if (error instanceof Error) {
        result = error.message;
    }

    return result;
}