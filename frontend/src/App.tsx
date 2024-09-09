import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScholarshipHome } from './pages/scholarship-home'
import { Scholarships } from './pages/scholarships'
import { MyProfile } from './pages/my-profile'
import { StudentInformation } from './pages/student-information'
import { SingleScholarship } from './pages/single-scholarship'
import './App.css'

function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/scholarshiphome" element={< ScholarshipHome />}></Route>
          <Route path="/scholarships" element={< Scholarships />}></Route>
          <Route path="/myprofile" element={< MyProfile />}></Route>
          <Route path="/studentinformation" element={< StudentInformation />}></Route>
          <Route path="/scholarshippage" element={< SingleScholarship/>}></Route>
          
        </Routes>
      
      </BrowserRouter>

        
    </>
  )
}

export default App
