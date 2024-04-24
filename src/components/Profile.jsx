import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const projectID = process.env.REACT_APP_API_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

const Profile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = `PRIVATE-KEY: ${privateKey}`;

        const url = "https://api.chatengine.io/users/{{user_id}}"

        const option = {
            method: "PATCH",
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

        fetch("https://api.chatengine.io/users/{{user_id}}/", option)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        // try {
        //     const res = await fetch(url, option);
        //     const data = await res.json();
        //     console.log(data);
        //     console.log(data.status);
        //
        //     navigate('/');
        //     setError('');
        // } catch (err) {
        //     setError('Something went wrong.');
        // }
    };

    const handleEditClick = () => {
        navigate('/');
    };

    return (
        <div className="wrapper">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input"
                           placeholder="Change Username"/>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                           className="input" placeholder="Change First Name"/>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input"
                           placeholder="Change Last Name"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           className="input" placeholder="Change Password"/>

                    <div align="center">
                        <button type="submit" onClick={handleEditClick} className="button">
                            <span>Confirm</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default Profile;
