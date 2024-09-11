'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, PenTool, Plus, Trash2 } from 'lucide-react'
import{Link} from "react-router-dom"
import { StudentNavbar } from '@/components/student-navbar'

interface Subtopic {
  id: number;
  subtitle: string;
  content: string;
}

export function CreateBlogPost() {
  const [blogPost, setBlogPost] = useState({
    title: '',
    shortDescription: '',
  })
  const [subtopics, setSubtopics] = useState<Subtopic[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBlogPost(prev => ({ ...prev, [name]: value }))
  }

  const handleSubtopicChange = (id: number, field: 'subtitle' | 'content', value: string) => {
    setSubtopics(prev => prev.map(subtopic => 
      subtopic.id === id ? { ...subtopic, [field]: value } : subtopic
    ))
  }

  const addSubtopic = () => {
    const newSubtopic: Subtopic = {
      id: Date.now(),
      subtitle: '',
      content: ''
    }
    setSubtopics(prev => [...prev, newSubtopic])
  }

  const deleteSubtopic = (id: number) => {
    setSubtopics(prev => prev.filter(subtopic => subtopic.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the blogPost and subtopics data to your backend
    console.log('Blog post submitted:', { ...blogPost, subtopics })
    // Implement your submission logic here
  }

  return (
    <div className="min-h-screen w-screen absolute left-0 right-0 top-0 bg-gradient-to-b from-purple-100 to-blue-200">
      <StudentNavbar />
      <br></br>
      <br></br>
      <br></br>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ScholarLink</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scholarships">Scholarships</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/create-blog">Create Blog</NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          Create a New Blog Post
        </motion.h1>

        <Card className="w-2/3 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-800">Blog Post Details</CardTitle>
            <CardDescription>Fill out the form below to publish your blog post.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={blogPost.title}
                  onChange={handleInputChange}
                  placeholder="Enter your blog title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={blogPost.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Provide a brief description of your blog post"
                  className="mt-1"
                />
              </div>

              {subtopics.map((subtopic, index) => (
                <Card key={subtopic.id} className="p-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-purple-800">Subtopic {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSubtopic(subtopic.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`subtitle-${subtopic.id}`}>Subtitle</Label>
                      <Input
                        id={`subtitle-${subtopic.id}`}
                        value={subtopic.subtitle}
                        onChange={(e) => handleSubtopicChange(subtopic.id, 'subtitle', e.target.value)}
                        placeholder="Enter subtopic title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`content-${subtopic.id}`}>Content</Label>
                      <Textarea
                        id={`content-${subtopic.id}`}
                        value={subtopic.content}
                        onChange={(e) => handleSubtopicChange(subtopic.id, 'content', e.target.value)}
                        placeholder="Write the content for this subtopic"
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSubtopic}
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-100"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Subtopic
              </Button>

              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Publish Blog Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      
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