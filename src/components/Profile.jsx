import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import userEvent from "@testing-library/user-event";

const projectID = process.env.REACT_APP_API_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

const Profile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
       async function getUser(){const currentUser = localStorage.getItem('username');
        const currentPassword = localStorage.getItem('password');
        const authObject = { 'Project-ID': projectID, 'User-Name': currentUser, 'User-Secret': currentPassword };
        try {
            const res = await axios.get('https://api.chatengine.io/users/me/', { headers: authObject });
            setUsername(res.data.username);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
        } catch (err) {
            setError('Something went wrong.');
        }}
        getUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = localStorage.getItem('username');
        const currentPassword = localStorage.getItem('password');


        const authObject = { 'Project-ID': projectID, 'User-Name': currentUser, 'User-Secret': currentPassword };
        const user_id = localStorage.getItem('id');

        const url = "https://api.chatengine.io/users/me/"
        console.log(authObject)


        //  , "user_secret": password
        try {
            let data = {"username": username,"first_name": firstName, "last_name": lastName};
            if (password){
                data["secret"] = password;
            }
            await axios.patch(url, data,{ headers: authObject });

            localStorage.setItem('username', username);
            if (password){
                localStorage.setItem('password', password);
            }


            // window.location.reload();
            navigate('/')
            setError('');
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    const handleDeleteClick = () => {
        navigate('/DeleteAccount');
    }

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
                        <button type="submit" className="button">
                            <span>Accept Changes?</span>
                        </button>
                        <button className="DeleteButton" type="submit" onClick={handleDeleteClick}>
                            <span>Delete Account</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default Profile;
