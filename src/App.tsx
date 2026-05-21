import { Navbar } from './components/navbar/Navbar'
import { ThemeProvider } from './context/ThemeContext'

import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )
}

export default App
