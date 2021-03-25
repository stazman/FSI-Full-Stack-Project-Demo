import { TextField, Button, LinearProgress, Card, FormHelperText } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { BACKEND_URL } from '../_constants'

export function LoginView() {

    const history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null)

    async function login() {
        setStatus('pending')
        let response = await fetch(`${BACKEND_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        let result = await response.json()
        if (result.error) {
            setStatus(null)
            setError(result.error)
        } else {
            setStatus('success')
            localStorage.setItem('token', result.token)
            dispatch({ type: 'LOGIN', user: result.user })
        }
    }

    return (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ flex: 1, maxWidth: 500 }}>
                <div className="card">
                    {status === 'pending' &&
                        <LinearProgress className="progress" />
                    }
                    <div className="card-header">
                        <img src="assets/mailbox.png"/>
                        <h1>HackerMail</h1>
                    </div>
                    <div style={{ padding: '4%', display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            error={error?.username?.message}
                            helperText={error?.username?.message}
                            disabled={status !== null}
                            style={{ marginBottom: '4%' }}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            id="username"
                            label="Username"
                            variant="filled"
                            fullWidth={true}
                            variant="outlined"
                        />
                        <TextField
                            error={error?.password?.message}
                            helperText={error?.password?.message}
                            value={password}
                            disabled={status !== null}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            label="Password"
                            variant="filled"
                            fullWidth={true}
                            variant="outlined"
                        />
                        {error?.message &&
                            <FormHelperText error={true}>
                                {error.message}
                            </FormHelperText>
                        }
                        <button className="link" disabled={status !== null} onClick={() => history.push('/create-account')}>
                            Create Account
                        </button>
                        <button className="action" disabled={status !== null} onClick={login}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}