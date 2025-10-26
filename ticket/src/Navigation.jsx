import { useNavigate } from "react-router-dom";
export function Navigation(){
    const navigate = useNavigate()
    return(
        <nav className="navbar navbar-expand-lg navbar-custom p-0">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="logo">
                        <img src="fixMate-logo-transparent.png"/>
                    </div>
                    <div>
                        <button className="coloured-btn" onClick={() => navigate("/auth/signup")}>Get Started</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}