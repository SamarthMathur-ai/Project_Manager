import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    return (
        

            <div className="form-container">

                <h1>Create Account</h1>

                <InputField
                    type="text"
                    placeholder="Name"
                />

                <InputField
                    type="text"
                    placeholder="Username"
                />

                <InputField
                    type="email"
                    placeholder="Email"
                />

                <InputField
                    type="password"
                    placeholder="Password"
                />

                <button className="btn" onClick={() => navigate("/dashboard")}>
                    Sign Up
                </button>

                <p>
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

       
    );
}

export default Signup;