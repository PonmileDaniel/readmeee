import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UploadDocumentPage from './Pages/UploadDocumentPage';
import Chat from './Pages/Chat';
import Protect from './Pages/protect';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Import Hero component
import Analysis from './components/analysis';
import About from './components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Render Navbar and Hero independently on the /home page */}
        <Route
          path="/"
          element={
            <>
              <Navbar /> <Hero /> <Analysis /> <About />
            </>
          }
        />
        {/* Other routes */}
        <Route path="/upload" element={<UploadDocumentPage />} />
        <Route path="/chat" element={
          <Protect>
          <Chat />
          </Protect>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


