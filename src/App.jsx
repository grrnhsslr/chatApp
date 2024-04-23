import { ChatEngine } from 'react-chat-engine';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';
import CreateUser from "./components/signup";

const projectID = process.env.REACT_APP_API_KEY;

const App = () => {
    const AuthenticatedApp = () => {
        const location = useLocation();
        const {pathname} = location;
        return (
            <ChatEngine
                height="100vh"
                projectID={projectID}
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
            />
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={localStorage.getItem('username') ? <AuthenticatedApp /> : <LoginForm />} />
                <Route path="/signup" element={<CreateUser />} />
                <Route path="/chat" element={<ChatFeed />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;