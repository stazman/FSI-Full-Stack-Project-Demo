import { createRef, useState } from 'react'
import { AppBar, Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

export function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(null)
    return (
        <AppBar style={{ display: 'flex', flexDirection: 'row', padding: 10, position: 'static' }}>
            <Typography variant="h6" style={{ marginLeft: 10, marginTop: 5, flexGrow: 1}}>
                HackerMail
            </Typography>
            <Avatar onClick={(e) => setAvatar(e.target)} style={{ cursor: 'pointer', backgroundColor: '#ff5722', }}>
                {currentUser.name.slice(0, 1)}
            </Avatar>
            <Menu
                id="simple-menu"
                anchorEl={avatar}
                keepMounted
                open={Boolean(avatar)}
                onClose={() => setAvatar(null)}
            >
                <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}