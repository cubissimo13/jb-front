import {useEffect, useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

function App() {
    const [name, setName] = useState('');

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />
                <main className="form-signin">
                    <Routes>
                    <Route path="/" element={<Home name={name} />} />
                    <Route path="/login" element={<Login setName={setName} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout setName={setName} />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;