import { Navigation } from './Navigation.jsx';
import { useNavigate } from 'react-router-dom';
import { Footer } from "./Footer.jsx";
import { Toast } from "./Toast.jsx";
export function LandingPage({ isAuthenticated }){
    const navigate = useNavigate();
    const features = [
        {
            icon: <i className="fa-solid fa-clipboard-list"></i>,
            title: "Seamless Ticket Tracking",
            description: "Create, view, and manage all your support tickets in one organized dashboard.",
        },
        {
            icon: <i className="fa-solid fa-arrows-rotate"></i>,
            title: "Real-Time Updates",
            description: "Stay informed with instant feedback and live status changes.",
        },
        {
            icon: <i className="fa-solid fa-bell"></i>,
            title: "Smart Notifications",
            description: "Get clear alerts for ticket actions, from errors to successful updates.",
        },
        {
            icon: <i className="fa-solid fa-lock"></i>,
            title: "Secure Authentication",
            description: "Your data is safe. Sessions are stored securely using our simulated token system.",
        }
    ]
    const stats = [
        {
            value: "5K+",
            title: "Active Users",
        },
        {
            value: "20K+",
            title: "Tickets managed",
        },
        {
            value: "99.9%",
            title: "Uptime",
        }
    ]
    return(
        <>
            <Navigation/>
            <div className="landing-page">
                <section className="hero position-relative">
                    <div className="circle-lg position-absolute"></div>
                    <div className="circle-xs position-absolute"></div>
                    <div className="circle-md position-absolute"></div>
                    <div className="circle-sm position-absolute "></div>
                    <img src="wave.svg" className="position-absolute bottom-0"/>
                    <div className="container">
                        <div className="description position-absolute text-white d-flex gap-3 justify-content-center align-items-center flex-column text-center">
                            <h1>Simplify Your Ticket Management</h1>
                            <p className="px-3 py-0 ">Track, organize, and resolve tickets faster than ever. FixMate helps you stay on top of every issue with a smooth and responsive workflow.</p>
                            <div className="buttons d-flex align-items-center justify-content-center gap-3">
                                <button className="btn" onClick={() => navigate("/auth/signup")}>Get Started</button>
                                <button className="transparent-btn" onClick={() => navigate("/auth/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features py-5">
                    <div className="container">
                        <div className="d-flex text-center justify-content-center flex-column gap-5">
                            <h2 className="pt-5">Why Choose fixMate?</h2>
                            <div className="row w-100 justify-content-center gap-3">
                                {
                                    features.map((feature, index) => 
                                        <div key={index} className="col-sm-12 col-md-3 d-flex justify-content-center p-4 align-items-start border-0 gap-2 card shadow-lg rounded-4 card-hover">
                                            <div className="icon">
                                                {feature.icon}
                                            </div>
                                            <h4 className="fs-5">
                                                {feature.title}
                                            </h4>
                                            <p className="p-0 m-0 text-start">
                                                {feature.description}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="stats bg-white py-4">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            {
                                stats.map((stat, index) => 
                                    <div className="" key={index}>
                                        <span className="stat-value display-2">{stat.value}</span>
                                        <p>{stat.title}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
                <section className="call-to-action">
                    <div className="container">
                        <div className="d-flex flex-column text-center align-items-center justify-content-center text-white gap-2 py-5">
                            <p className="m-0">Ready to Take Control of Your Workflow?</p>
                            <span>Sign up now and start managing tickets effortlessly with FixMate.</span>
                            <button className="btn mt-4" onClick={() => navigate("/auth/signup")}> Get Started for Free</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}