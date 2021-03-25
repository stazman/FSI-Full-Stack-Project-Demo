import { Avatar, Icon, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
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
                <List className="inbox" style={{ margin: '0 auto 2em auto' }}>
                    {currentUser.inbox.map(message => (
                        <MessageCard className="email" key={message._id} message={message} onClick={(e) => toggleMessage(message._id, e)} />
                    ))}
                </List>
            </div>
        </div>
    )
}

function MessageCard(props) {
    const message = props.message
    const selectedMessageIds = useSelector(state => state.selectedMessageIds)
    const sent = formatDate(message.sent)
    const defaultColor = message.isRead ? undefined : '#e0c08b'
    return (
        <ListItem onClick={props.onClick}>
            <ListItemIcon>
                <Avatar style={{ backgroundColor: selectedMessageIds.includes(message._id) ? '#5D3ED2' : defaultColor }}>
                    {selectedMessageIds.includes(message._id)
                        ? <CheckIcon />
                        : message.from.slice(0, 1)
                    }
                </Avatar>
            </ListItemIcon>
            <ListItemText
                style={{ maxWidth: '80%', userSelect: 'none' }}
                primary={(
                    <span className="subject" style={{ opacity: message.isRead ? '0.6' : '1', fontWeight: message.isRead ? '200' : '500' }}>
                        {message.from}: {message.subject}
                    </span>
                )}
                secondary={(
                    <span className="body" style={{ opacity: message.isRead ? '0.6' : '1', fontWeight: message.isRead ? '100' : '400' }}>
                        {message.content}
                    </span>
                )}
            />
            <ListItemSecondaryAction>
                <ListItemText
                    secondary={
                        <span className="date">{sent}</span>
                    }
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

function formatDate(dateStr) {
    let date = new Date(dateStr)
    let dateString = date.toString()
    return `${date.getDate()} ${dateString.split(' ')[1]}`
}