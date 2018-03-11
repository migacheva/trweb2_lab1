const initialState = [];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case 'TODOS_LOADED':
            return action.data;
        case 'TODO_ADDED':
            // alert("Задача добавлена");
            return action.data;
        case 'TODO_REMOVED':
            // alert("Задача удалена");
            return action.data;
        case 'TODO_ADD_FAIL':
            alert(action.error);
            return state;
        case 'SEARCH_TODO':
            if (action.query) {
                return state.filter(todo => todo.text.includes(action.query));
            }
            return state;
        default:
            return state;
    }
};
