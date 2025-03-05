import React, { useState, useEffect } from 'react';
import './NextPage.css';
import Nav from './Nav';
import { db } from './FirebaseConfig'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

function NextPage() {
    // States
        const [showInput, setShowInput] = useState(false);
        const [trackingNumber, setTrackingNumber] = useState('');
        const [trackingList, setTrackingList] = useState([]);
        const [expandedItem, setExpandedItem] = useState(null);

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
                try {
                    console.log("Fetching tracking numbers from Firestore...");
                    const querySnapshot = await getDocs(collection(db, "TrackingNumbers"));
        
                    if (querySnapshot.empty) {
                        console.warn("No tracking numbers found in Firestore.");
                    }
        
                    const trackingData = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        console.log("Document data:", data); // Debugging: See the actual Firestore document structure
                        return {
                            id: doc.id,
                            number: data.number || "No number found" // Handle missing fields
                        };
                    });
        
                    console.log("Fetched tracking data:", trackingData);
                    setTrackingList(trackingData);
                } catch (error) {
                    console.error("Error fetching tracking numbers:", error);
                }
            };
        
            fetchTrackingNumbers();
        }, []);
    
    // Debugging: Check if state updates
        useEffect(() => {
            console.log("Updated tracking list state:", trackingList);
        }, [trackingList]); // Runs when `trackingList` changes
    
    

    // Handle adding to Firebase DB
        const handleAddToDB = async () => {
            if (trackingNumber.trim() === '') return;
        
            try {
                const docRef = await addDoc(collection(db, "TrackingNumbers"), {
                    numbers: [trackingNumber],  // Store initial tracking number in an array
                });
        
                console.log("Tracking number added with ID:", docRef.id);
        
                // Update the state to display the new tracking number immediately
                setTrackingList([...trackingList, { id: docRef.id, numbers: [trackingNumber] }]);
                setTrackingNumber('');
            } catch (error) {
                console.error("Error adding tracking number:", error);
            }
        };
    
    // Toggle dropdown content
        const toggleDropdown = (id) => {
            setExpandedItem(expandedItem === id ? null : id);
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
                            <li className='NextPage-li' key={item.id}>
                                <div className='NextPage-li-content'>
                                    <button className='NextPage-tracking-button' onClick={() => toggleDropdown(item.id)}>
                                        {item.number}
                                    </button>
                                </div>
                                {expandedItem === item.id && (
                                    <div className='NextPage-dropdown-content'>
                                        <p className='NextPage-dropdown-text'>
                                            Tracking Number: {item.number} <br />
                                            Item: X<br />
                                            Shipper: X<br />
                                            XXX: X
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tracking numbers added yet.</p>
                )}
            </div>

            <footer className='Home-footer'>
                Package Tracking Web Application | Portfolio Project | 2025
            </footer>
        </div>
    );
}

export default NextPage;
