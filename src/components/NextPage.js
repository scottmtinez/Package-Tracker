import React, { useState, useEffect } from 'react';
import './NextPage.css';
import Nav from './Nav';

function NextPage(){
    // States
        const [showInput, setShowInput] = useState(false);
        const [trackingNumber, setTrackingNumber] = useState('');

    // Toggle the input visibility
        const toggleInput = () => {
            setShowInput(!showInput);
        };
    
    // Handle input change
        const handleInputChange = (e) => {
            setTrackingNumber(e.target.value);
        };

    // Handle adding to DB (to be implemented later)
        const handleAddToDB = () => {
            // For now, just log the tracking number
                console.log('Tracking number to add to DB:', trackingNumber);
        };

    
    return (
        <div className='NextPage-container'>
            <Nav />
            <div className={`NextPage-add-package ${showInput ? 'show-input' : ''}`}>
                <button className='NextPage-search-btn' style={{ visibility: showInput ? 'visible' : 'hidden', opacity: showInput ? 1 : 0, transition: 'opacity 0.3s ease' }}><i className="bi bi-search"></i></button>
                <button className='NextPage-add-package-btn' onClick={toggleInput}>Add Package <i className={`bi ${showInput ? 'bi bi-x' : 'bi-plus-lg'}`}></i></button>
                <input type="text" className="NextPage-input" placeholder='Add tracking number...' value={trackingNumber} onChange={handleInputChange} />  
            </div>

            <footer className='Home-footer'>Package Tracking Web Application | Portfolio Project | 2025</footer>
        </div>
    );
}

export default NextPage;