import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='nav-container'>
            <nav className='navbar'>
                <div className='logo'>
                    <h1 className='nav-title'>Package Tracker</h1>
                </div>
                <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
                    <li><Link to='/nextpage'>My Packages</Link></li>
                    <li><Link to='/myaccount'>Account <i class="bi bi-person-square"></i></Link></li>
                </ul>
                <div className='menu-icon' onClick={() => setIsOpen(!isOpen)}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
            </nav>
        </div>
    );
}

export default Nav;