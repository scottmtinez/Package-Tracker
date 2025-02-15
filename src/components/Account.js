import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate hook
import { auth } from './FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Account() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  // Reset errors

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            navigate('/nextPage');  // Redirect user to next page
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className='Account-container'>
            <div className='Account-entire-box'>
                <img src="https://www.univio.com/wp-content/uploads/2020/08/transport_industry-1024x614.jpg" alt="Transport Industry" />
                
                <div className='Account-login-box'>
                    <form className='Account-login-form' onSubmit={handleLogin}>
                        <h1 className='Account-login-title'>Login</h1>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <input
                            type='email'
                            placeholder='Email'
                            className='Account-login-username-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type='password'
                            placeholder='Password'
                            className='Account-login-password-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input type='submit' value='Login' className='Account-login-submit-button' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Account;
