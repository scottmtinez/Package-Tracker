import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate hook
import { auth } from './FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Account() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);  // State to toggle between Login/Sign Up
    const navigate = useNavigate();  // Initialize navigate
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');  // Reset errors
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
            navigate('/nextPage');  // Redirect user to next page
        } catch (err) {
            setError('Error creating account');
        }
    };

    return (
        <div className='Account-container'>
            <div className='Account-entire-box'>
                <img src="https://www.univio.com/wp-content/uploads/2020/08/transport_industry-1024x614.jpg" alt="Transport Industry" />
                
                <div className='Account-login-box'>
                    {/* Show Login or Sign Up Form based on isSignUp state */}
                    <form className='Account-login-form' onSubmit={isSignUp ? handleSignUp : handleLogin}>
                        <h1 className='Account-login-title'>{isSignUp ? 'Sign Up' : 'Login'}</h1>
    
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
    
                        {/* Only render Confirm Password if it's a Sign Up */}
                        {isSignUp && (
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                className='Account-signup-confirm-password-input'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        )}
    
                        <input
                            type='submit'
                            value={isSignUp ? 'Sign Up' : 'Login'}
                            className={isSignUp ? 'Account-signup-submit-button' : 'Account-login-submit-button-login'} 
                        />

                    </form>
    
                    {/* Link to toggle between Login and Sign Up */}
                    <p className="Account-toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 
                            'Already have an account? ' : 
                            'Don\'t have an account? '}
                        <span className="highlight">{isSignUp ? 'Login' : 'Sign Up'}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Account;
