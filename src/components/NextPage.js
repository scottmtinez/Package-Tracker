import React, { useState, useEffect } from 'react';
import './NextPage.css';
import Nav from './Nav';
import { db } from './FirebaseConfig'; 
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

function NextPage() {
    // States
        const [showInput, setShowInput] = useState(false);
        const [trackingNumber, setTrackingNumber] = useState('');
        const [trackingList, setTrackingList] = useState([]);
        const [expandedItem, setExpandedItem] = useState(null);

        const docRef = doc(db, "TrackingNumbers", "Packages");

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
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("Document data:", data);
                        setTrackingList(data.PackageArray || []); // Store array
                    } else {
                        console.warn("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching tracking numbers:", error);
                }
            };
            fetchTrackingNumbers();
        }, []);
    
    // Debugging: Check if state updates
        useEffect(() => {
            console.log("Updated tracking list state:", trackingList);
        }, [trackingList]); 
    
    // Handle adding to Firebase DB
        const handleAddToDB = async () => {
            if (trackingNumber.trim() === '') return;

            try {
                const newEntry = {
                    id: Date.now().toString(), // Unique ID for frontend use
                    trackingNumber: trackingNumber,
                    item: "Unknown",
                    shipper: "Unknown",
                    estimatedDelivery: "Unknown"
                };

                await updateDoc(docRef, {
                    PackageArray: arrayUnion(newEntry) // Add new entry to array
                });

                console.log("Tracking number added:", newEntry);

                // Update state to reflect new data
                setTrackingList([...trackingList, newEntry]);
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
                        {trackingList.map((item, index) => (
                            <li className='NextPage-li' key={item.id || index}>
                                <div className='NextPage-li-content'>
                                    <button className='NextPage-tracking-button' onClick={() => toggleDropdown(item.id || index)}>
                                        {item.trackingNumber || "Unknown Tracking Number"}
                                    </button>
                                </div>
                                {expandedItem === (item.id || index) && (
                                    <div className='NextPage-dropdown-content'>
                                        <p className='NextPage-dropdown-text'>
                                            Tracking Number: {item.trackingNumber || "Unknown Tracking Number"} <br />
                                            Item: {item.item || "Unknown"}<br />
                                            Shipper: {item.shipper || "Unknown"}<br />
                                            Estimated Delivery: {item.estimatedDelivery || "Unknown"}
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
