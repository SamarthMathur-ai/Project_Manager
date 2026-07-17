import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }
        else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {

        if (!validate()) return;

        try {

            const response = await api.post(
                "/auth/userLogin",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                response.data.refreshToken
            );

            if (response.status === 200) {

                setMessage("Login Successful. Rerouting to Dashboard.");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);

            }

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Invalid username or password."
            );

            console.log(error);
        }
    };

    return (
        <div className="form-container">

            <h1>Login</h1>

            <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);

                    setErrors({
                        ...errors,
                        username: ""
                    });
                }}
            />

            {errors.username && (
                <p className="error">{errors.username}</p>
            )}

            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);

                    setErrors({
                        ...errors,
                        password: ""
                    });
                }}
            />

            {errors.password && (
                <p className="error">{errors.password}</p>
            )}

            <button
                className="btn"
                onClick={handleLogin}
            >
                Login
            </button>

            <p>{message}</p>

            <p>
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
            </p>

        </div>
    );
}

export default Login;