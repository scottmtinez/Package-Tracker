import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './components/Account';
import NextPage from './components/NextPage';  // Create this page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/nextPage" element={<NextPage />} />
            </Routes>
        </Router>
    );
}

export default App;
