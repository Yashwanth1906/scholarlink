

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Search, LogIn, Menu,  } from 'lucide-react'
import {Link, useNavigate, } from "react-router-dom"
import axios from 'axios'
import { BACKEND_URL } from '../../config'

type scholarhsips=
  {
    "id": number,
    "name": string,
    "providedby": string,
    "scholarshipfor": string[],
    "likes": number,
    "amt": number,
    "period":number
    "regstdate": string,
    "regenddate": string,
    "description": string,
    "procedures": string[],
    "admin": {
        "id": number,
        "email": string,
        "password": string,
        "orgname": string
    }
}[]



export function Scholarships() {

  const [scholarships,setScholarships]=useState<scholarhsips>([]);
  const [loading,setLoading]=useState<boolean>(true);
  const navigate =useNavigate();

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/student/scholarships`,{
      headers:{
        Authorization:localStorage.getItem("studenttoken")
      }
    }).then((data)=>{
      console.log(data.data)
      setScholarships(data.data.scholarships)
      setLoading(false)

    })


  },[])

  if(loading)
  {
    return(
      <>
      Loading...
      </>
    )
  }

  // const filteredScholarships = scholarships.filter(scholarship => 
  //   scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (fieldFilter === '' || scholarship.field === fieldFilter)
  // )

  return (
    <div className="min-h-screen w-screen absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/scholarships-home" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scholarships">Scholarships</NavLink>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </nav>
          <div className="md:hidden flex items-center">
            {/* <Button
              variant="ghost"
              className="mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button> */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white p-2">
              <LogIn className="h-4 w-4" />
              <span className="sr-only">Sign In</span>
            </Button>
          </div>
        </div>
        {/* {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white px-4 py-2 shadow-md"
          >
            <NavLink href="/" mobile>Home</NavLink>
            <NavLink href="/scholarships" mobile>Scholarships</NavLink>
          </motion.nav>
        )} */}
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">Available Scholarships</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          {/* <div className="w-full md:w-1/2 relative">
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div> */}
          {/* <div className="w-full md:w-1/4">
            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ss">All Fields</SelectItem>
                <SelectItem value="STEM">STEM</SelectItem>
                <SelectItem value="International Studies">International Studies</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                <SelectItem value="Medical Studies">Medical Studies</SelectItem>
                <SelectItem value="Arts and Humanities">Arts and Humanities</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl font-bold text-purple-800">{scholarship.name}</CardTitle>
                <p className="text-sm text-gray-600">{scholarship.admin.orgname }</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-lg font-semibold text-green-600 mb-2">{scholarship.amt}</p>
                <p className="text-sm text-gray-600 mb-2">Deadline: {scholarship.regenddate}</p>
                <p className="text-sm text-purple-600 mb-4">{scholarship.period +"  Years"}</p>
                <p className="text-sm text-gray-700 mb-4">{scholarship.description}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={()=>{
                  navigate(`/student/scholarship?id=${scholarship.id}`)

                }}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {scholarships.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No scholarships found matching your criteria.</p>
        )}
      </main>

      {/* <footer className="bg-gray-800 text-white py-8  absolute b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">ScholarLink</h3>
              <p className="text-gray-400">Empowering dreams through education</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/scholarships" className="text-gray-400 hover:text-white">Scholarships</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-r-none focus:ring-purple-500 focus:border-purple-500"
                />
                <Button type="submit" className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 ScholarLink. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
//@ts-ignore
function NavLink({ href, children, mobile = false }) {
  const baseClasses = "text-gray-600 hover:text-purple-600 transition-colors duration-200"
  const mobileClasses = mobile ? "block py-2" : ""
  
  return (
    <Link to={href} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  )
}