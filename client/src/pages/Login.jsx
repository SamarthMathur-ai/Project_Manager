import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <div className="form-container">

            <h1>Login</h1>

            <InputField
                type="text"
                placeholder="Username"
            />

            <InputField
                type="password"
                placeholder="Password"
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