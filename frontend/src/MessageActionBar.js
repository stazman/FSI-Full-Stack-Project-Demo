import { Button, Tooltip } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import UnreadIcon from '@material-ui/icons/Mail'
import ReadIcon from '@material-ui/icons/Drafts'
import EditIcon from '@material-ui/icons/Edit'

import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "./_constants";

export function MessageActionBar() {
    const selectedMessageIds = useSelector(state => state.selectedMessageIds)
    const dispatch = useDispatch()
    const noMessagesSelected = selectedMessageIds.length === 0

    async function deleteMessages() {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BACKEND_URL}/messages/delete`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(selectedMessageIds)
        })
        const result = await response.json()
        if (!result.error) {
            dispatch({ type: 'DELETE_SELECTED_MESSAGES' })
        }
    }

    async function markRead() {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BACKEND_URL}/messages/read`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(selectedMessageIds)
        })
        const result = await response.json()
        if (!result.error) {
            dispatch({ type: 'MARK_SELECTED_MESSAGES_READ' })
        }
    }

    async function markUnread() {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BACKEND_URL}/messages/unread`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(selectedMessageIds)
        })
        const result = await response.json()
        if (!result.error) {
            dispatch({ type: 'MARK_SELECTED_MESSAGES_UNREAD' })
        }
    }

    return (
        <div className="action-bar">
            <Tooltip title="Delete">
                <Button className="action-icon" disabled={noMessagesSelected} onClick={deleteMessages}>
                    <DeleteIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Mark Unread">
                <Button className="action-icon" disabled={noMessagesSelected} onClick={markUnread}>
                    <UnreadIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Mark Read">
                <Button className="action-icon" disabled={noMessagesSelected} onClick={markRead}>
                    <ReadIcon />
                </Button>
            </Tooltip>
            <Button id="compose" color="primary" onClick={() => dispatch({ type: 'OPEN_COMPOSE_MODAL' })}>
                <EditIcon style={{ marginRight: '0.2em' }}/> COMPOSE
            </Button>
        </div>
    )
}