import { ChatEngine } from 'react-chat-engine';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';
import CreateUser from "./components/signup";
import Profile from "./components/Profile";
import DeleteAccount from "./components/DeleteAccount";
import { useState} from "react";

const projectID = process.env.REACT_APP_API_KEY;

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('username') ? true : false);

    const loginUser = () => {
        setIsLoggedIn(true);
    }


    const AuthenticatedApp = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const {pathname} = location;
        const handleLogout = async () => {



            localStorage.clear();
            navigate('/Login');
        }

        const handleProfile = () => {
            navigate('/Profile');
        }

        return (
            <div className="chats-page">
                <div className="nav-bar">
                    <div className="logout-tab">
                        <a onClick={handleProfile} className="profile">Profile</a>
                        <a onClick={handleLogout} className="logout">Logout</a>
                    </div>
                </div>
                <ChatEngine
                    height="97.5vh"
                    projectID={projectID}
                    userName={localStorage.getItem('username')}
                    userSecret={localStorage.getItem('password')}
                    renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                    onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
                />
            </div>
        );
    };

    return (
            <Routes>
                <Route path="/" element={isLoggedIn ? <AuthenticatedApp /> : <LoginForm loginUser={loginUser}/>} />
                <Route path="/signup" element={<CreateUser />} />
                <Route path="/chat" element={<ChatFeed />} />
                <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/DeleteAccount" element={<DeleteAccount />} />
            </Routes>
    );
};

export default App;