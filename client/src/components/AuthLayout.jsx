function AuthLayout({ children }) {
    return (
        <div className="container">

            <div className="left-panel">
                <h1>ProjectHub</h1>

                <h3>
                    Organize. Collaborate. Deliver.
                </h3>

                <p>
                    Manage projects, track progress and
                    collaborate with your team from one
                    centralized platform.
                </p>

            </div>

            <div className="right-panel">
                {children}
            </div>

        </div>
    );
}

export default AuthLayout;