const AlertReducer = (state, action) => {
    // eslint-disable-next-line react/destructuring-assignment
    switch (action.type) {
        case 'SET_ALERT':
            // eslint-disable-next-line react/destructuring-assignment
            return action.payload
        case 'REMOVE_ALERT':
            return null
        default:
            return state
    }
}

export default AlertReducer
