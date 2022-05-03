import {Navigate} from "react-router-dom";

function Logout(props: { setName: (name: string) => void }) {
    localStorage.removeItem('userName');

    props.setName('')

    return <Navigate to="/" />;
}

export default Logout;