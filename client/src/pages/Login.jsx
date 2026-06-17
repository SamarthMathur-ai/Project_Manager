import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function Login() {
    return (
        <AuthLayout>

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

                <button className="btn">
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>

            </div>

        </AuthLayout>
    );
}

export default Login;