import { Avatar, Fab, Icon, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'


import { useDispatch, useSelector } from "react-redux";
import { MessageActionBar } from "../MessageActionBar";

export function InboxView() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const selectedMessageIds = useSelector(state => state.selectedMessageIds)

    function toggleMessage(id, e) {
        e.stopPropagation()
        if (selectedMessageIds.includes(id)) {
            dispatch({ type: 'UNSELECT_MESSAGE', id })
        } else {
            dispatch({ type: 'SELECT_MESSAGE', id })
        }
    }

    function unSelectAll() {
        dispatch({ type: 'UNSELECT_ALL_MESSAGES' })
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <MessageActionBar />
            <div style={{ flex: 1 }} onClick={unSelectAll}>
                <List style={{ width: '80vw', left: '10vw' }}>
                    {currentUser.inbox.map(message => (
                        <MessageCard key={message._id} message={message} onClick={(e) => toggleMessage(message._id, e)} />
                    ))}
                </List>
                <Fab color="primary" style={{ position: 'absolute', bottom: 50, right: 50 }} onClick={() => dispatch({ type: 'OPEN_COMPOSE_MODAL' })}>
                    <EditIcon />
                </Fab>
            </div>
        </div>
    )
}

function MessageCard(props) {
    const message = props.message
    const selectedMessageIds = useSelector(state => state.selectedMessageIds)
    const sent = formatDate(message.sent)
    const defaultColor = message.isRead ? undefined : '#000000'
    return (
        <ListItem style={{ cursor: 'pointer' }} onClick={props.onClick}>
            <ListItemIcon>
                <Avatar style={{ backgroundColor: selectedMessageIds.includes(message._id) ? '#3f51b5' : defaultColor }}>
                    {selectedMessageIds.includes(message._id)
                        ? <CheckIcon />
                        : message.from.slice(0, 1)
                    }
                </Avatar>
            </ListItemIcon>
            <ListItemText
                style={{ maxWidth: '80%', userSelect: 'none' }}
                primary={(
                    <span style={{ fontWeight: message.isRead ? 'normal' : 'bold' }}>
                        {message.from}: {message.subject}
                    </span>
                )}
                secondary={message.content}
            />
            <ListItemSecondaryAction>
                <ListItemText
                    secondary={sent}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

function formatDate(dateStr) {
    let date = new Date(dateStr)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}