// 'use client'

// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { GraduationCap, Home, FileText, User, LogOut, ChevronDown } from 'lucide-react'

// export function StudentNavbar() {
//   const [isProfileOpen, setIsProfileOpen] = useState(false)

//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-8">
//             <Link to="/student/home" className="flex items-center space-x-2">
//               <GraduationCap className="h-8 w-8 text-purple-600" />
//               <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
//             </Link>
//             <div className="hidden md:flex items-center space-x-4">
//               <NavLink href="/student/home">
//                 <Home className="h-4 w-4 mr-1" />
//                 Home
//               </NavLink>
//               <NavLink href="/student/government-scholarships">
//                 <GraduationCap className="h-4 w-4 mr-1" />
//                 Government Scholarships
//               </NavLink>
//               <NavLink href="/student/application-status">
//                 <FileText className="h-4 w-4 mr-1" />
//                 Application Status
//               </NavLink>
//             </div>
//           </div>
//           <div className="relative">
//             <Button
//               variant="ghost"
//               className="flex items-center space-x-2"
//               onClick={toggleProfile}
//             >
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="/placeholder.svg" alt="Student" />
//                 <AvatarFallback>ST</AvatarFallback>
//               </Avatar>
//               <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
//             </Button>
//             <AnimatePresence>
//               {isProfileOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
//                 >
//                   <Link to="/student/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200">
//                     <User className="h-4 w-4 inline-block mr-2" />
//                     My Profile
//                   </Link>
//                   <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200">
//                     <LogOut className="h-4 w-4 inline-block mr-2" />
//                     Sign Out
//                   </Link>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
//   return (
//     <Link to={href} className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200">
//       {children}
//     </Link>
//   )
// }
'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Home, FileText, User, LogOut, ChevronDown } from 'lucide-react'

export  function StudentNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  return (
    <nav className="bg-white w-full absolute  top-0 left-0 right-0shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/student/scholarships" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <div className="flex items-center space-x-8 ml-auto">
            <div className="hidden md:flex items-center space-x-4">
              <NavLink href="/student/scholarships">
                <Home className="h-4 w-4 mr-1" />
                Home
              </NavLink>
              <NavLink href="/student/GovernmentScholarships">
                <GraduationCap className="h-4 w-4 mr-1" />
                Government Scholarships
              </NavLink>
              <NavLink href="/student/scholarshipview">
                <FileText className="h-4 w-4 mr-1" />
                Application Status
              </NavLink>
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={toggleProfile}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Student" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </Button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link to="/student/myprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200">
                      <User className="h-4 w-4 inline-block mr-2" />
                      My Profile
                    </Link>
                    <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200">
                      <LogOut className="h-4 w-4 inline-block mr-2" />
                      Sign Out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200">
      {children}
    </Link>
  )
}
