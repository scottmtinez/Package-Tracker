import React, { useState, useEffect } from 'react';
import './Home.css';
import Account from './Account';

function Home(){
    return (
        <div className='home-container'>
            <header className='Home-header'>Package Tracker</header>
                <Account />
            <footer className='Home-footer'>Package Tracking Web Application | Portfolio Project | 2025</footer>
        </div>
/* --- --- */
    );
}

export default Home;