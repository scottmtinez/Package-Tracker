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
        if (trackingNumber.trim() === '') {
            console.warn("Attempted to add an empty tracking number.");
            return;
        }

        try {
            console.log("Adding tracking number to Firestore:", trackingNumber);
            const docRef = await addDoc(collection(db, "TrackingNumbers"), {
                number: trackingNumber
            });
            console.log("Tracking number added with ID:", docRef.id);
            
            // Update state to display the new tracking number immediately
            setTrackingList([...trackingList, { id: docRef.id, number: trackingNumber }]);
            setTrackingNumber(''); 
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
                            <li className='NextPage-li' key={item.id}>
                                <strong>{item.number}</strong>
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
