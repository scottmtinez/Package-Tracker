import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './components/Account';
import NextPage from './components/NextPage';  
import Home from './components/Home';  
import UsersAccountInfo from './components/UsersAccountInfo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/nextPage" element={<NextPage />} />
                <Route path="/myaccount" element={<UsersAccountInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
