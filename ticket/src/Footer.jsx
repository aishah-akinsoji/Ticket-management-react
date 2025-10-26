import { useNavigate } from "react-router-dom";
export function Footer({ isAuthenticated }){
    const date = new Date();
    const year = date.getFullYear()
    const navigate = useNavigate()
    return(
        <footer>
            <div className="container">
                <div className="text-white row align-items-center justify-content-between">
                    <div className="d-flex flex-column brand col-12 col-md-4">
                        <div className="logo">
                            <img src="fixMate-white-logo-transparent.png"/>
                        </div>
                        <p className="text-white">Streamline your workflow with our powerful ticket management system.</p>
                    </div>
                    <div className="quick-links col-12 col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a onClick={() => navigate("/")}>Home</a></li>
                            <li><a onClick={() => {isAuthenticated ? navigate("/dashboard") : navigate("/auth/login")}}>{isAuthenticated ? "Dashboard" : "Login"}</a></li>
                            <li><a onClick={() => {isAuthenticated ? navigate("/tickets") : navigate("/auth/signup")}}>{isAuthenticated ? "Tickets" : "Signup"}</a></li>
                        </ul>
                    </div>
                    <div className="contact col-12 col-md-4">
                        <h5>Contact</h5>
                        <p>support@fixmate.com</p>
                        <p>&copy;{year} fixMate. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}