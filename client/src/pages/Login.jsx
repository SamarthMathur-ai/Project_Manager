import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js"

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const handleLogin = async () => {
        
        try {
            const response = await api.post(
                "/auth/userLogin",
                {
                    username,
                    password
                }
            )

            // ! Pasting access and refresh token in local storage
            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            )

            localStorage.setItem(
                "refreshToken",
                response.data.refreshToken
            )

            console.log(response.data);
            if(response.status===200) {
                setMessage("Login Successful. Rerouting to Dashboard.");
                setTimeout(()=>{
                    navigate("/dashboard");
                },1500)
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something is wrong"
            )
            console.log(error);
        }
    }
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
            

            <button className="btn" onClick={handleLogin}>
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