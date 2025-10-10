const validateTodoTitle = (title: string): string => {
    let titleLength = title.trim().length;
    if (titleLength === 0) {
        return ('Это поле не может быть пустым');
    }

    if (titleLength < 2) {
        return ('Минимальная длина текста 2 символа');
    }

    if (titleLength > 64) {
        return ('Максимальная длина текста 64 символа');
    }

    return '';
}

export default validateTodoTitle