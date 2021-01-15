import { BrowserRouter } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { LoginView } from './views/LoginView'
import { CreateAccountView } from './views/CreateAccountView'
import { useEffect } from 'react'
import { BACKEND_URL } from './_constants'
import { InboxView } from './views/InboxView'
import { NavBar } from './NavBar'
import { ComposeMessageView } from './views/ComposeMessageView'


export function AppRouter() {

    const token = localStorage.getItem('token')
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    async function retrieveLoggedInUser() {
        if (token) {
            let response = await fetch(`${BACKEND_URL}/auth/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            let result = await response.json()
            if (!result.error) {
                dispatch({ type: 'LOGIN', user: result.user })
            }
        }
    }

    useEffect(() => {
        retrieveLoggedInUser()
    }, [])

    if(currentUser === null && token){
        return null
    }

    return (
        <BrowserRouter>
            { currentUser !== null
                ? (
                    <>
                        <NavBar />
                        <Switch>
                            <Route path="/inbox" component={InboxView} />
                            <Route path="/" render={() => <Redirect to="/inbox" />} />
                        </Switch>
                        <ComposeMessageView />
                    </>
                )
                : (
                    <Switch>
                        <Route path="/create-account" component={CreateAccountView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/" render={() => <Redirect to="/login" />} />
                    </Switch>
                )
            }
        </BrowserRouter>
    )
}