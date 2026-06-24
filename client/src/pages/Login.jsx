import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form-container">

            <h1>Login</h1>

            <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="btn" onClick={() => navigate("/dashboard")}>
                Login
            </button>

             

            <p>
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
            </p>

        </div>
    );
}

export default Login;