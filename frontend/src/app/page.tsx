import Image from 'next/image'
import React from 'react'
import config from './config'
import Link from 'next/link'

type NavigationLink = {
  name: string;
  href: string;
  imp?: boolean
}

const navigationLinks: NavigationLink[] = [
  { name: 'Home', href: '#',},
  { name: 'Features', href: '#',},
  { name: 'Proof', href: '#',},
  { name: 'FAQ', href: '#',},
  { name: 'Contact', href: '#',},
  { name: 'Login', href: '/login', imp: true },
  { name: 'Sign Up', href: '/signup', imp: true },
]

const Landing = () => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="top-0 z-50 sticky flex flex-row bg-test1 p-2 w-full">
        <section className="flex flex-row justify-between section">                  
          {/* Logo */}
          <div className="flex flex-row items-center gap-1">
            <Image src={config.logo} alt="Logo" width={40} height={40} className='size-7 md:size-10' />
            <span className="font-roboto font-semibold text-2xl md:text-3xl">{config.title}</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex flex-row items-center gap-5 font-medium text-teal-600 text-sm md:text-base">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href} className="font-roboto">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="sm:hidden flex flex-row items-center gap-7 font-medium text-teal-600 text-sm md:text-base">
            {navigationLinks.filter(link => link.imp).map((link) => (
              <Link key={link.name} href={link.href} className="font-roboto">
                {link.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Hero Section */}
      <div className="flex bg-test2 p-2 w-full h-[75vh]">
        <section className="flex sm:flex-row flex-col justify-around items-center gap-5 sm:gap-10 px-10 sm:px-16 w-full h-full section">
          {/* Left Text and CTA */}
          <div className="flex flex-col justify-center items-start gap-3 w-full sm:w-1/3 md:w-1/2 lg:w-1/3 translate-y-8 sm:-translate-y-8">
            <h1 className="font-bold text-gray-800 text-3xl md:text-5xl">{config.moat}</h1>
            <p className="text-gray-600 text-lg md:text-xl">{config.description}</p>
            <Link href="/signup" className="bg-teal-600 hover:bg-teal-700 mt-4 px-6 py-2 rounded-md text-white transition duration-300">
              Get Started
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center mb-8 sm:mb-0 w-1/2 max-[440px]:w-full min-[440px]:min-w-80">
            <Image src={config.heroImg} alt="Hero Image" width={500} height={500} className="rounded-md w-full h-auto" />
          </div>
        </section>
      </div>

      {/* Features */}

      {/* Proof */}

      {/* FAQ */}

      {/* CTA */}

      {/* Footer */}
    </div>
  )
}

export default Landing