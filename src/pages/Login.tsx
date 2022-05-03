import {SyntheticEvent, useState} from 'react';
import {Navigate} from "react-router-dom";
import Hint from "../components/Hint";

function Login(props: { setName: (name: string) => void }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        }).then(async (response) => {
            if (response.ok) {
                const content = await response.json();

                localStorage.setItem('userName', content.jwtToken);
                setRedirect(true);
                props.setName(content.userName);
            } else {
                setShowHint(true)
            }
        })
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <p><small>Don't have an account yet? Press Register</small></p>
            <input type="userName" className="form-control" placeholder="Username" required
                onChange={e => setUserName(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            {showHint ? <Hint /> : ''}
        </form>
    );
}

export default Login;