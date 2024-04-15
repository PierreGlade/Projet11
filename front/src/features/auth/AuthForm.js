import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    changeUserCredentials,
    getAuthError,
    getAuthStatus,
    getUserToken,
} from './authSlice';
import Loader from '../../utils/Loader/Loader';

function AuthForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(true);

    const authError = useSelector(getAuthError);
    const authStatus = useSelector(getAuthStatus);

    useEffect(() => {
        // Vérifie si les informations d'identification sont déjà stockées localement
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
            // Si elles le sont, met à jour l'état avec ces informations
            setCredentials({
                email: storedEmail,
                password: storedPassword,
            });
        }
    }, []);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    let content;
    if (authStatus === 'failed') {
        content = <span className="errorMessage">{authError}</span>;
    } else if (authStatus === 'loading') {
        content = <Loader />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('email', credentials.email);
            localStorage.setItem('password', credentials.password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
        await dispatch(changeUserCredentials(credentials));
        await dispatch(getUserToken(credentials));
        navigate('/profile');
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="email"
                    autoFocus
                    value={credentials.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            {content}
        </form>
    );
}

export default AuthForm;