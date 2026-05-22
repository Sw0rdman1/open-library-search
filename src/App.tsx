import { Navbar } from './components/navbar/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import BookDetailsPage from './pages/BookDetailsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
