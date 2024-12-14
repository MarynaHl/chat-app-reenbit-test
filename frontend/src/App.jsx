import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainChatPage from './pages/MainChatPage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<MainChatPage />} />
        </Routes>
    </Router>
);

export default App;
