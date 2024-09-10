import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScholarshipHome } from './pages/scholarship-home'
import { Scholarships } from './pages/scholarships'
import { MyProfile } from './pages/my-profile'
import { StudentInformation } from './pages/student-information'
import { SingleScholarship } from './pages/single-scholarship'
import './App.css'
import { StudentRegister } from './pages/studentRegister'
import { StudLogin } from './pages/studentLogin'
import { CreateBlogPost } from "./pages/create-blog-post"
import{ScholarshipViewer} from './pages/scholarship-viewer'

function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/student/register" element={< StudentRegister />}></Route>
          <Route path="/student/login" element={< StudLogin />}></Route>
          <Route path="/student/scholarshiphome" element={< ScholarshipHome />}></Route>
          <Route path="/student/scholarships" element={< Scholarships/>}></Route>
          <Route path="/student/information" element={<StudentInformation />}></Route>
          <Route path="/student/createblog" element={<CreateBlogPost />}></Route>
          <Route path="/student/scholarship" element={<SingleScholarship />}></Route>
          <Route path="/student/appliedscholarship" element={<ScholarshipViewer/>}></Route>
          <Route path="/student/myprofile" element={<MyProfile/>}></Route>
         

          

        </Routes>
      
      </BrowserRouter>

        
    </>
  )
}

export default App
