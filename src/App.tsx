import { Navbar } from './components/navbar/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import LandingPage from './pages/LandingPage';
import BookDetailsPage from './pages/BookDetailsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
