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
import { AdminRegister } from './adminpages/adminRegister'
import { AdminLogin } from './adminpages/adminlogin'
import { AdminScholarshipCreation } from './adminpages/CreateScholarship'
import { AdminOngoingScholarships } from './adminpages/ShowOngoingScholarships'
import { AdminCompletedScholarships } from './adminpages/ShowCompletedScholarships'
import { ScholarshipDetails } from './adminpages/ScholarshipDetails'
import { LandingPage } from './pages/landing-page'
function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
        <Route path="/" element={< LandingPage />}></Route>
          <Route path="/student/register" element={< StudentRegister />}></Route>
          <Route path="/student/login" element={< StudLogin />}></Route>
          <Route path="/student/scholarshiphome" element={< ScholarshipHome />}></Route>
          <Route path="/student/scholarships" element={< Scholarships/>}></Route>
          <Route path="/student/information" element={<StudentInformation />}></Route>
          <Route path="/student/createblog" element={<CreateBlogPost />}></Route>
          <Route path="/student/scholarship" element={<SingleScholarship />}></Route>
          <Route path="/student/scholarshipview" element={<ScholarshipViewer/>}></Route>
          <Route path="/student/myprofile" element={<MyProfile/>}></Route>



          <Route path="/admin/register" element={<AdminRegister/>}></Route>
          <Route path="/admin/login" element={<AdminLogin/>}></Route>
          <Route path="/admin/createscholarship" element={<AdminScholarshipCreation/>}></Route>
          <Route path="/admin/showongoing" element={<AdminOngoingScholarships/>}></Route>
          <Route path="/admin/showcompleted" element={<AdminCompletedScholarships/>}></Route>
          <Route path="/admin/scholarshipdetails" element={<ScholarshipDetails/>}></Route>


         

          

        </Routes>
      
      </BrowserRouter>

        
    </>
  )
}

export default App
