import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const projectID = process.env.REACT_APP_API_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = `PRIVATE-KEY: ${privateKey}`;

        const url = "https://api.chatengine.io/users/"

        const option = {
            method: "POST",
            headers: {
                'PRIVATE-KEY': privateKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "secret": password,
                "first_name": firstName,
                "last_name": lastName
            })
        }

        try {
            const res = await fetch(url, option);
            const data = await res.json();

            navigate('/Login');
            setError('');
        } catch (err) {
            setError('Must Enter a Valid Username/password.');
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name" />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Last Name" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Create Account</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>

    );
};

export default SignUp;
