'use client'

import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, User, LogOut, Menu } from 'lucide-react'

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="bg-white  w-screen absolute left-0 right-0 top-0 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin/" className="flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-purple-600" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-purple-600 leading-tight">ScholarLink</span>
              <span className="text-sm text-purple-400 leading-tight">Admin</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/admin/showongoing">Ongoing</NavLink>
            <NavLink href="/admin/showcompleted">Completed</NavLink>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Profile"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/signout" className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink href="/admin/ongoing">Ongoing</NavLink>
            <NavLink href="/admin/completed">Completed</NavLink>
            <NavLink href="/admin/profile">My Profile</NavLink>
            <NavLink href="/signout" className="text-red-600">Sign Out</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  const navigate = useNavigate()
  

  return (
    <Link
      to={href}
      className={`block py-2 px-3 rounded-md transition-colors duration-200 `}
        
    >
      {children}
    </Link>
  )
}