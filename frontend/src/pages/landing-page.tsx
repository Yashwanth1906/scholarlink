'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Search, Edit, Award, Users, ArrowRight } from 'lucide-react'
import {Link} from "react-router-dom"
// import Image from 'next/image'

export function LandingPage() {
  return (
    <div className="min-h-screen w-screen absolute left-0 right-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            
            <Button asChild variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100">
              <Link to="/admin/login">Admin</Link>
            </Button>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/student/login">Student</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <h1 className="text-5xl font-bold text-purple-800 mb-6">
                  Unlock Your Potential with ScholarLink
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Discover, apply, and track scholarships tailored to your academic journey. Let ScholarLink be your guide to educational success.
                </p>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Link to="/student/register">Get Started <ArrowRight className="ml-2" /></Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2"
              >
                {/* <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Students using ScholarLink"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                /> */}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Why Choose ScholarLink?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="h-12 w-12 text-purple-600" />}
                title="Smart Scholarship Matching"
                description="Our advanced algorithm finds scholarships that perfectly match your profile and aspirations."
              />
              <FeatureCard
                icon={<Edit className="h-12 w-12 text-purple-600" />}
                title="Easy Application Process"
                description="Streamlined application forms and essay writing tools to help you put your best foot forward."
              />
              <FeatureCard
                icon={<Award className="h-12 w-12 text-purple-600" />}
                title="Track Your Progress"
                description="Stay on top of your applications with real-time status updates and reminders."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-8">Join Thousands of Successful Students</h2>
            <p className="text-xl text-gray-700 mb-12">
              ScholarLink has helped students secure over $10 million in scholarships. Your success story starts here.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/student/register">Create Your Free Account</Link>
            </Button>
          </div>
        </section>

        <section className="py-20 bg-purple-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="ScholarLink made finding and applying for scholarships so much easier. I've secured funding for my entire undergraduate degree!"
                author="Emily S., Harvard University"
              />
              <TestimonialCard
                quote="The essay writing tools and application tracking features are game-changers. Highly recommend to all students!"
                author="Michael L., Stanford University"
              />
              <TestimonialCard
                quote="As a first-generation college student, ScholarLink guided me through the entire process. I'm now studying on a full scholarship!"
                author="Jessica T., MIT"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">ScholarLink</span>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2023 ScholarLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
      {children}
    </Link>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-bold text-purple-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="bg-purple-700">
      <CardContent className="pt-6">
        <Users className="h-8 w-8 text-purple-300 mb-4" />
        <p className="italic text-white mb-4">"{quote}"</p>
        <p className="font-semibold text-purple-300">- {author}</p>
      </CardContent>
    </Card>
  )
}