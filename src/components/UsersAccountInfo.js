import React, { useEffect, useState } from 'react';
import './UsersAccountInfo.css';
import Nav from './Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { auth } from './FirebaseConfig';  

function UsersAccountInfo() {
    //States
        const [user, setUser] = useState(null);

    // Fetch the currently logged-in user
        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((currentUser) => {
                setUser(currentUser);  // Set user if logged in, or null if not
            });

            return () => unsubscribe();  // Clean up subscription on component unmount
        }, []);

    return (
        <div className='Account-container'>
        <Nav />
        <div className='Account-content'>
            {user ? (
                <>
                    <h1>Account Information</h1>
                    <div className="user-info">
                        <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
                        <p><strong>Email:</strong> {user.email || "N/A"}</p>
                        <p><strong>UID:</strong> {user.uid}</p>
                    </div>
                </>
            ) : (
                <p>Please log in to view your account details.</p>
            )}
        </div>
        <footer className='Home-footer'>Package Tracking Web Application | Portfolio Project | 2025</footer>
    </div>
    );
}

export default UsersAccountInfo;
