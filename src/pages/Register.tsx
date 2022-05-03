import {SyntheticEvent, useState} from 'react';
import {Navigate} from "react-router-dom";
import Hint from "../components/Hint";

function Register() {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName,
                role,
                password
            })
        }).then((response) => {
            if (response.ok) {
                setRedirect(true)
            } else {
                setShowHint(true)
            }
        })
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control" placeholder="Name" required
                onChange={e => setUserName(e.target.value)}
            />

            <select id="role" className="form-control" required onChange={e => setRole(e.target.value)}>
                <option value="ADMIN">ADMIN</option>
                <option value="REVIEWER">REVIEWER</option>
                <option value="USER">USER</option>
            </select>

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <div className="alert alert-primary" role="alert">
                Password must contain at least 8 characters from next categories: uppercase characters (A-Z),
                lowercase characters (a-z), digits (0-9), special characters (!?/#)
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            {showHint ? <Hint /> : ''}
        </form>
    );
}

export default Register;
