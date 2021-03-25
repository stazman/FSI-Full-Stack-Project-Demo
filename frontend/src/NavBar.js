import { useState } from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const [button, setButton] = useState(null)
    return (
        <header>
            <div>
                <img src="assets/mailbox.png"/>
                <h1>HackerMail</h1>
            </div>
            <Button onClick={(e) => setButton(e.target)} style={{ color: '#eee' }}>
                <PowerSettingsNewIcon/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={button}
                keepMounted
                open={Boolean(button)}
                onClose={() => setButton(null)}
            >
                <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>Logout {currentUser.name} </MenuItem>
            </Menu>
        </header>
    )
}