import {Navigate} from "react-router-dom";
import {useState} from "react";
import AccessAllowed from "../components/access/AccessAllowed";
import AccessDenied from "../components/access/AccessDenied";
import PasswordChanged from "../components/password/PasswordChanged";
import PasswordChangeError from "../components/password/PasswordChangeError";

function Home(props: { name: string }) {

    const [resultAdmin, setResultAdmin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [resultReviewer, setResultReviewer] = useState(false);
    const [showReviewer, setShowReviewer] = useState(false);
    const [resultUser, setResultUser] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    const [passwordChangedSuccessfully, setPasswordChangedSuccessfully] = useState(false);

    const URL = 'http://localhost:8080/api/v1';

    if (!props.name) {
        return <Navigate to="/login" />;
    }

    const jwtToken = 'Bearer ' + localStorage.getItem('userName');

    const admin = async () => {
        await fetch(URL + '/internal/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        }).then((response) => {
            setShowAdmin(true)
            response.ok ? setResultAdmin(true) : setResultAdmin(false)
        })
    }

    const reviewer = async () => {
        await fetch(URL + '/internal/reviewer', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        }).then((response) => {
            setShowReviewer(true)
            response.ok ? setResultReviewer(true) : setResultReviewer(false)
        })
    }

    const user = async () => {
        await fetch(URL + '/internal/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        }).then((response) => {
            setShowUser(true)
            response.ok ? setResultUser(true) : setResultUser(false)
        })
    }

    const changePassword = async () => {

        await fetch(URL + '/auth/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            },
            body: JSON.stringify({
                newPassword
            })
        }).then((response) => {
            setShowPasswordHint(true)
            response.ok ? setPasswordChangedSuccessfully(true) : setPasswordChangedSuccessfully(false)
        })
    }

    return (
        <>
            <div className="display-4">
                {props.name ? 'Hi, ' + props.name + '!' : 'You are successfully logged in'}
            </div>

            <p className="lead">
                You can check the following resources.
                Access to the resources depends on your role you chose during registration. Also
                you can change password if you want.
            </p>

            <form onClick={admin}>
                <button className="w-100 btn btn-lg btn-outline-primary" type="button">Admin resources</button>
                {showAdmin ? (resultAdmin ? <AccessAllowed /> : <AccessDenied />) : ''}
            </form>

            <form onClick={reviewer}>
                <button className="w-100 btn btn-lg btn-outline-secondary" type="button">Reviewer resources</button>
                {showReviewer ? (resultReviewer ? <AccessAllowed /> : <AccessDenied />) : ''}
            </form>

            <form onClick={user}>
                <button className="w-100 btn btn-lg btn-outline-success" type="button">User resources</button>
                {showUser ? (resultUser ? <AccessAllowed /> : <AccessDenied />) : ''}
            </form>

            <input type="password" className="form-control" placeholder="New password" required
                onChange={e => setNewPassword(e.target.value)}
            />

            <form onClick={changePassword}>
                <button className="w-100 btn btn-lg btn-outline-dark" type="button">Change password</button>
                {showPasswordHint ? (passwordChangedSuccessfully ? <PasswordChanged /> : <PasswordChangeError />) : ''}
            </form>

        </>
    );
}

export default Home;