'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Search, Heart, Users, Mail, Menu, LogIn } from 'lucide-react'
// import Image from '/'

const scholarshipProviders = [
  {
    name: "Bright Future Foundation",
    focus: "STEM Education",
    image: "/placeholder.svg?height=100&width=100",
    description: "Empowering the next generation of scientists and engineers through comprehensive STEM scholarships."
  },
  {
    name: "Hope for All",
    focus: "General Education",
    image: "/placeholder.svg?height=100&width=100",
    description: "Providing opportunities for students from all backgrounds to pursue their educational dreams."
  },
  {
    name: "Tech Innovators Fund",
    focus: "Computer Science",
    image: "/placeholder.svg?height=100&width=100",
    description: "Supporting aspiring technologists to shape the future of digital innovation."
  },
  {
    name: "Global Leaders Scholarship",
    focus: "International Studies",
    image: "/placeholder.svg?height=100&width=100",
    description: "Fostering cross-cultural understanding and preparing students for global leadership roles."
  },
  {
    name: "Green Earth Scholars",
    focus: "Environmental Science",
    image: "/placeholder.svg?height=100&width=100",
    description: "Nurturing the environmental stewards of tomorrow through dedicated scholarship programs."
  },
  {
    name: "Healthcare Heroes",
    focus: "Medical Studies",
    image: "/placeholder.svg?height=100&width=100",
    description: "Investing in future healthcare professionals to ensure quality medical care for all."
  }
]

export function ScholarshipHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen w-screen  absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/scholarship-home">Home</NavLink>
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
            <NavLink href="#home" mobile>Home</NavLink>
            <NavLink href="#scholarships" mobile>Scholarships</NavLink>
          </motion.nav>
        )}
      </header>

      <main>
        <section id="home" className="container mx-auto px-4 py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-purple-800 mb-4"
          >
            Empowering Dreams Through Education
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Connecting underprivileged students with life-changing scholarships
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Find Scholarships
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100">
              Learn More
            </Button>
          </motion.div>
        </section>

        <section id="scholarships" className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Scholarship Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarshipProviders.map((provider, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-purple-100">
                          {/* <Image
                            // src={provider.image}
                            // alt={`${provider.name} logo`}
                            // layout="fill"
                            // objectFit="cover"
                          /> */}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-purple-800">{provider.name}</CardTitle>
                          <p className="text-sm text-gray-600">{provider.focus}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 text-sm mb-4">{provider.description}</p>
                      <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-purple-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Are You a Student in Need?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Don't let financial constraints hold you back. Apply for scholarships today!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="bg-white text-purple-700 hover:bg-gray-100">
                Start Your Application
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">ScholarLink</h3>
              <p className="text-gray-400">Empowering dreams through education</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#scholarships" className="text-gray-400 hover:text-white">Scholarships</a></li>
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
    <a href={href} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </a>
  )
}