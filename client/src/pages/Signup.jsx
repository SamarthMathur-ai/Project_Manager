import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSignup = async() => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/userRegister",
                {
                    name,
                    username,
                    email,
                    password
                },
            );
            console.log(response.data);
            if(response.status === 201) {
                setMessage("Account Created Successfully. Rerouting to login page")
                setTimeout(() => {
                    navigate("/");
                }, 1500);            
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong."
            );// ! optional chaining
            console.log(error);
        }
    }
    return (
        

            <div className="form-container">

                <h1>Create Account</h1>

                <InputField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                

                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                

                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button 
                    className="btn" 
                    onClick={handleSignup}
                    
                    // onClick={() => navigate("/dashboard")}
                >
                    Sign Up
                </button>

                <p>{message}</p>

                <p>
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

       
    );
}

export default Signup;