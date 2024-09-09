'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Search, LogIn, Menu, Filter } from 'lucide-react'
import {Link, useNavigate} from "react-router-dom"

const scholarships = [
  {
    id: 1,
    name: "STEM Excellence Scholarship",
    provider: "Bright Future Foundation",
    amount: "$10,000",
    deadline: "2023-12-31",
    field: "STEM",
    description: "For outstanding students pursuing degrees in Science, Technology, Engineering, or Mathematics."
  },
  {
    id: 2,
    name: "Global Citizen Grant",
    provider: "Hope for All",
    amount: "$5,000",
    deadline: "2023-11-30",
    field: "International Studies",
    description: "Supporting students who demonstrate a commitment to global issues and cross-cultural understanding."
  },
  {
    id: 3,
    name: "Future Tech Leaders Award",
    provider: "Tech Innovators Fund",
    amount: "$15,000",
    deadline: "2024-01-15",
    field: "Computer Science",
    description: "For aspiring technologists with innovative ideas and strong coding skills."
  },
  {
    id: 4,
    name: "Environmental Stewardship Scholarship",
    provider: "Green Earth Scholars",
    amount: "$7,500",
    deadline: "2023-10-31",
    field: "Environmental Science",
    description: "Supporting students dedicated to environmental conservation and sustainability."
  },
  {
    id: 5,
    name: "Healthcare Heroes Grant",
    provider: "Healthcare Heroes",
    amount: "$12,000",
    deadline: "2024-02-28",
    field: "Medical Studies",
    description: "For students pursuing careers in healthcare with a focus on community service."
  },
  {
    id: 6,
    name: "Arts and Humanities Fellowship",
    provider: "Creative Minds Institute",
    amount: "$6,000",
    deadline: "2023-11-15",
    field: "Arts and Humanities",
    description: "Encouraging students in the arts, literature, and philosophy to pursue their creative passions."
  }
]

export function Scholarships() {
  const [searchTerm, setSearchTerm] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (fieldFilter === '' || scholarship.field === fieldFilter)
  )

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
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white p-2">
              <LogIn className="h-4 w-4" />
              <span className="sr-only">Sign In</span>
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white px-4 py-2 shadow-md"
          >
            <NavLink href="/" mobile>Home</NavLink>
            <NavLink href="/scholarships" mobile>Scholarships</NavLink>
          </motion.nav>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">Available Scholarships</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2 relative">
            <Input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="w-full md:w-1/4">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl font-bold text-purple-800">{scholarship.name}</CardTitle>
                <p className="text-sm text-gray-600">{scholarship.provider}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-lg font-semibold text-green-600 mb-2">{scholarship.amount}</p>
                <p className="text-sm text-gray-600 mb-2">Deadline: {scholarship.deadline}</p>
                <p className="text-sm text-purple-600 mb-4">{scholarship.field}</p>
                <p className="text-sm text-gray-700 mb-4">{scholarship.description}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No scholarships found matching your criteria.</p>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
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
      </footer>
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