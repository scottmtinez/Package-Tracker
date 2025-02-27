import React, { useState, useEffect } from 'react';
import './NextPage.css';
import Nav from './Nav';
import { db } from './FirebaseConfig'; // Import Firebase Firestore
import { collection, addDoc, getDocs } from 'firebase/firestore';

function NextPage() {
    // States
    const [showInput, setShowInput] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingList, setTrackingList] = useState([]);

    // Toggle the input visibility
    const toggleInput = () => {
        setShowInput(!showInput);
    };

    // Handle input change
    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    // Fetch tracking numbers from Firestore
    useEffect(() => {
        const fetchTrackingNumbers = async () => {
            const querySnapshot = await getDocs(collection(db, "TrackingNumbers"));
            const trackingData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                number: doc.data().number
            }));
            setTrackingList(trackingData);
        };

        fetchTrackingNumbers();
    }, []);

    // Handle adding to Firebase DB
    const handleAddToDB = async () => {
        if (trackingNumber.trim() === '') return; // Prevent empty submissions
        
        try {
            const docRef = await addDoc(collection(db, "trackingNumbers"), {
                number: trackingNumber
            });
            console.log("Tracking number added with ID:", docRef.id);
            
            // Update state to display the new tracking number immediately
            setTrackingList([...trackingList, { id: docRef.id, number: trackingNumber }]);
            setTrackingNumber(''); // Clear input field
        } catch (error) {
            console.error("Error adding tracking number:", error);
        }
    };

    return (
        <div className='NextPage-container'>
            <Nav />
            
            <div className={`NextPage-add-package ${showInput ? 'show-input' : ''}`}>
                <button 
                    className='NextPage-search-btn' 
                    onClick={handleAddToDB} 
                    style={{ visibility: showInput ? 'visible' : 'hidden', opacity: showInput ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                    <i className="bi bi-search"></i>
                </button>
                <button className='NextPage-add-package-btn' onClick={toggleInput}>
                    Add Package <i className={`bi ${showInput ? 'bi bi-x' : 'bi-plus-lg'}`}></i>
                </button>
                <input 
                    type="text" 
                    className="NextPage-input" 
                    placeholder='Add tracking number...' 
                    value={trackingNumber} 
                    onChange={handleInputChange} 
                />  
            </div>
            
            <div className='NextPage-Display-DB'>
                <h3>Tracking Numbers</h3>
                {trackingList.length > 0 ? (
                    <ul>
                        {trackingList.map((item) => (
                            <li key={item.id}>
                                <strong>Tracking Number:</strong> {item.number}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tracking numbers added yet.</p>
                )}
            </div>

            <footer className='Home-footer'>Package Tracking Web Application | Portfolio Project | 2025</footer>
        </div>
    );
}

export default NextPage;
