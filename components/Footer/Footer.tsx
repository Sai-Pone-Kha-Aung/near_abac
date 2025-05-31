"use client"
import React, { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Instagram, Facebook, Mail, Phone } from 'lucide-react'
import { Button } from '../ui/button'

const links = [
    { id: 1, title: "Apartments", url: "/apartments" },
    { id: 2, title: "Restaurants", url: "/restaurants" },
    { id: 3, title: "Cafes", url: "/cafes" },
    { id: 4, title: "Shopping", url: "/shopping" },
]

const Footer = () => {
    // Pre-calculated year to prevent layout shift
    const currentYear = useMemo(() => {
        if (typeof window !== 'undefined') {
            return new Date().getFullYear()
        }
        return 2024 // Fallback for SSR
    }, [])

    const [isHydrated, setIsHydrated] = useState(false)
    const [emailValue, setEmailValue] = useState('')

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log('Newsletter subscription:', emailValue)
        setEmailValue('')
    }

    return (
        <footer
            className='bg-gray-900 text-white pt-16 pb-8'
            style={{
                minHeight: '400px',
                contain: 'layout style',
                contentVisibility: 'auto',
                containIntrinsicSize: '100% 400px'
            }}
        >
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
                    {/* About Section */}
                    <div className='flex flex-col gap-4' style={{ minHeight: '200px' }}>
                        <div className='flex items-center h-8'>
                            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
                                <MapPin className="h-7 w-7 text-near-purple flex-shrink-0" />
                                <span>NEAR ABAC</span>
                            </Link>
                        </div>
                        <p className='text-gray-400 leading-relaxed'>
                            Your go-to guide for exploring everything around Assumption University,
                            from accommodations to food and entertainment.
                        </p>
                        <div className='flex gap-2 mt-auto'>
                            <Link
                                href="https://www.facebook.com/nearabac"
                                target="_blank"
                                className="flex-shrink-0"
                                aria-label="Facebook"
                            >
                                <Facebook className='h-6 w-6 text-gray-400 hover:text-near-purple transition-colors duration-300' />
                            </Link>
                            <Link
                                href="https://www.instagram.com/nearabac/"
                                target="_blank"
                                className="flex-shrink-0"
                                aria-label="Instagram"
                            >
                                <Instagram className='h-6 w-6 text-gray-400 hover:text-near-purple transition-colors duration-300' />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <nav style={{ minHeight: '200px' }}>
                        <h3 className='text-lg font-medium mb-4 h-7'>Quick Links</h3>
                        <div className='flex flex-col gap-2'>
                            {links.map((link) => (
                                <Link
                                    href={link.url}
                                    key={link.id}
                                    className='text-gray-400 hover:text-white transition-colors duration-300 py-1 h-8 flex items-center'
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Contact Section */}
                    <div style={{ minHeight: '200px' }}>
                        <h3 className="text-lg font-medium mb-4 h-7">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 min-h-[60px]">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 leading-relaxed">
                                    Assumption University, Bang Na, Bangkok, Thailand
                                </span>
                            </li>
                            <li className="flex items-center gap-3 min-h-[32px]">
                                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                <Link
                                    href="mailto:contact@nearabac.com"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    contact@nearabac.com
                                </Link>
                            </li>
                            <li className="flex items-center gap-3 min-h-[32px]">
                                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                <Link
                                    href="tel:+6623004543"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    +66 2 300 4543
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div style={{ minHeight: '200px' }}>
                        <h3 className="text-lg font-medium mb-4 h-7">Stay Updated</h3>
                        <p className='text-gray-400 mb-4 leading-relaxed'>
                            Subscribe to our newsletter to get the latest updates about places near ABAC.
                        </p>
                        <form onSubmit={handleSubmit} className='flex w-full max-w-sm'>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                className='px-4 py-2 rounded-l-md outline-none text-gray-800 flex-1 min-w-0 h-10 text-sm'
                                required
                                style={{ width: '60%' }}
                            />
                            <Button
                                type="submit"
                                className='bg-near-purple hover:bg-near-purple-dark px-4 py-2 rounded-none rounded-r-md transition-colors whitespace-nowrap h-10 text-sm flex-shrink-0'
                                style={{ width: '40%', minWidth: '80px' }}
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className='border-t border-gray-800 pt-8 text-center text-gray-500 text-sm' style={{ minHeight: '80px' }}>
                    <p className="mb-2">
                        © {isHydrated ? currentYear : '2024'} NEAR ABAC. All rights reserved.
                    </p>
                    <div className="space-x-4">
                        <Link href="#" className="hover:text-gray-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-gray-600">|</span>
                        <Link href="#" className="hover:text-gray-400 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer