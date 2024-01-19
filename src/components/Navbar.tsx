import React from 'react'
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { auth, signOut } from '@/auth'

const Navbar = async() => {
  const session = await auth();
  
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
    <MaxWidthWrapper>
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="flex z-40 font-semibold">
          <span>quill.</span>
        </Link>
        {/* TODO: Add mobile navbar */}
        <div className="hidden items-center space-x-4 sm:flex">
          <Link className={buttonVariants({
            variant: 'ghost',
            size: 'sm'
          })} href="/pricing">Pricing</Link>
          {session 
              ? 
            <>
              <Link className={buttonVariants({
                variant: 'ghost',
                size: 'sm'
              })} href="/dashboard">Dashboard</Link>
              <form action={async() => {
                "use server";
                await signOut();
              }}>
                <Button type="submit">Logout</Button>
              </form>
            </>
              : 
            <>
              <Link className={buttonVariants({
                variant: 'ghost',
                size: 'sm'
              })} href="/login">Login</Link>
              <Link className={buttonVariants({
                size: 'sm'
              })} href="/register">
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </>
          }
        </div>
      </div>
    </MaxWidthWrapper>
  </nav>
  )
}

export default Navbar