import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const projectID = process.env.REACT_APP_API_KEY;

const DeleteAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = localStorage.getItem('username');
        const currentPassword = localStorage.getItem('password');


        const authObject = { 'Project-ID': projectID, 'User-Name': currentUser, 'User-Secret': currentPassword };

        try {
            await axios.delete('https://api.chatengine.io/users/me/', { headers: authObject });

            localStorage.clear();
            setError('');
            navigate('/login');
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Are you sure you want to delete your account? </h1>
                <form onSubmit={handleSubmit}>
                    <h1>This Cannot Be Undone!</h1>
                    <div align="center">
                        <button onClick={handleCancel} className="button">
                            <span>Cancel</span>
                        </button>
                        <button type="submit" className="DeleteButton">
                            <span>Confirm</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default DeleteAccount;
