export default function registration(state = {loading: false, error: false }, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text]);
        default:
            return state
    }
}