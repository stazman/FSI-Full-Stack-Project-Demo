
export function reducer(currentState, action) {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...currentState,
                currentUser: action.user
            }
        case 'LOGOUT':
            localStorage.setItem('token', '')
            return {
                ...currentState,
                currentUser: null
            }
        case 'OPEN_COMPOSE_MODAL':
            return {
                ...currentState,
                composeModalOpen: true
            }
        case 'CLOSE_COMPOSE_MODAL':
            return {
                ...currentState,
                composeModalOpen: false
            }
        case 'SELECT_MESSAGE':
            return {
                ...currentState,
                selectedMessageIds: [
                    ...currentState.selectedMessageIds,
                    action.id
                ]
            }
        case 'UNSELECT_MESSAGE':
            return {
                ...currentState,
                selectedMessageIds: currentState.selectedMessageIds.filter(id => id != action.id)
            }
        case 'UNSELECT_ALL_MESSAGES':
            return {
                ...currentState,
                selectedMessageIds: []
            }
        case 'DELETE_SELECTED_MESSAGES':
            return {
                ...currentState,
                selectedMessageIds: [],
                currentUser: {
                    ...currentState.currentUser,
                    inbox: currentState.currentUser.inbox.filter(message => (
                        !currentState.selectedMessageIds.includes(message._id)
                    ))
                }
            }
        case 'MARK_SELECTED_MESSAGES_READ':
            return {
                ...currentState,
                currentUser: {
                    ...currentState.currentUser,
                    inbox: currentState.currentUser.inbox.map(message => (
                        !currentState.selectedMessageIds.includes(message._id)
                            ? message
                            : {
                                ...message,
                                isRead: true
                            }
                    ))
                }
            }
        case 'MARK_SELECTED_MESSAGES_UNREAD':
            return {
                ...currentState,
                currentUser: {
                    ...currentState.currentUser,
                    inbox: currentState.currentUser.inbox.map(message => (
                        !currentState.selectedMessageIds.includes(message._id)
                            ? message
                            : {
                                ...message,
                                isRead: false
                            }
                    ))
                }
            }
    }

    return currentState
}

// 