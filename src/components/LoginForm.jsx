import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const projectID = process.env.REACT_APP_API_KEY;

const Login = ({ loginUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

        try {
            const res = await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            loginUser();

            setError('');
            navigate('/')
        } catch (err) {
            console.log(err);
            setError('Oops! wrong Username or Password.');
        }
    };

    const handleSignUpClick = () => {
       navigate('/signup');
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Log In or Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Login</span>
                        </button>
                        <button onClick={handleSignUpClick} className="button">
                            <span>Sign Up</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>

    );
};

export default Login;
