import {User} from "../../data/User";
import {useState} from "react";

function UserTable(props: { users: Array<User> }) {
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [roles, setRoles] = useState(new Array<string>());

    const URL = 'http://localhost:8080/api/v1';
    const jwtToken = 'Bearer ' + localStorage.getItem('userName');

    let url = URL + '/user-management/' + id + '/change-role?userRole=' + role;
    const changeRole = async () => {
        console.log(url)
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        })
    }

    const allRoles = () => {
        fetch(URL + '/user-management/user-roles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            }
        }).then((response) => {
            console.log(response)
            response.json().then(data => {
                console.log(data);
                setRoles(data)
            })
        })
    }

    return (

        <div className="container-fluid">
            <div className="row align-items-start">
                <div className="col-sm-2 bg-info p-3 border">
                    Id
                </div>
                <div className="col-sm-5 bg-info p-3 border">
                    User
                </div>
                <div className="col-sm-5 bg-info p-3 border">
                    Role
                </div>
            </div>

            {props.users.map(user => {
                let id = user.id;
                let name = user.userName
                let role = user.role;
                return (
                    <div key={id} className="row align-items-start">
                        <div className="col-sm-2 bg-light p-3 border">
                            {id}
                        </div>
                        <div className="col-sm-5 bg-light p-3 border">
                            {name}
                        </div>
                        <div className="col-sm-5 bg-light p-3 border" placeholder={role}>
                            {role}
                        </div>

                        <select onClick={allRoles} id={name + id.toString() + role} key={name + id + role}
                                className="col-sm-8 bg-light p-6 border"
                                required
                                onChange={e => {
                                    setRole(e.target.value)
                                    setId(id.toString())
                                }}>
                            <option selected disabled={true}>Select role for {name}</option>
                            {roles.map(role => {
                                let value = role;
                                let key = role + id
                                return (
                                    <option value={value} key={key}>{value}</option>
                                );
                            })}
                        </select>
                        <form onClick={changeRole}>
                            <button className="btn btn-primary btn-sm" type="button">Change Role</button>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default UserTable;