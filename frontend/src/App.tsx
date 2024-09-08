import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScholarshipHome } from './pages/scholarship-home'
import { Scholarships } from './pages/scholarships'
import './App.css'

function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/scholarshiphome" element={< ScholarshipHome />}></Route>
          <Route path="/scholarships" element={< Scholarships/>}></Route>
          
        </Routes>
      
      </BrowserRouter>

        
    </>
  )
}

export default App
