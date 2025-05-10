import React from 'react'
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
    return (
        <footer className='bg-gray-900 text-white pt-16 pb-8'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
                    {/* about */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex'>
                            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white-900">
                                <MapPin className="h-7 w-7 text-near-purple" />
                                <span>NEAR ABAC</span>
                            </Link>
                        </div>
                        <p className='text-gray-400'>Your go-to guide for exploring everything around Assumption University, from accommodations to food and entertainment.</p>
                        <div className='flex gap-2'>
                            <Link href="https://www.facebook.com/nearabac" target="_blank">
                                <Facebook className='h-6 w-6 text-gray-400 hover:text-near-purple transition-colors duration-300' />
                            </Link>
                            <Link href="https://www.instagram.com/nearabac/" target="_blank">
                                <Instagram className='h-6 w-6 text-gray-400 hover:text-near-purple transition-colors duration-300' />
                            </Link>
                        </div>
                    </div>


                    {/* Quick links */}
                    <nav>
                        <h3 className='text-lg font-medium mb-4'>Quick Links</h3>
                        <div className='flex flex-col gap-2'>
                            {links.map((link) => (
                                <Link href={link.url} key={link.id} className='space-y-2 text-gray-400 hover:text-white transition-colors duration-300'>
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Contact us */}

                    <div>
                        <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                <span className="text-gray-400">Assumption University, Bang Na, Bangkok, Thailand</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <Link href="mailto:contact@nearabac.com" className="text-gray-400 hover:text-white transition-colors">contact@nearabac.com</Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <Link href="tel:+6623004543" className="text-gray-400 hover:text-white transition-colors">+66 2 300 4543</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletters */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
                        <p className='text-gray-400 mb-4'>Subscribe to our newsletter to get the latest updates about places near ABAC.</p>
                        <form className='flex'>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='px-4 py-2 rounded-l-md outline-none text-gray-800 w-full max-w-[220px]'
                                required
                            />
                            <Button type="submit" className='bg-near-purple hover:bg-near-purple-dark px-2 py-2 rounded-none rounded-r-md transition-colors'>Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className='border-t border-gray-800 pt-8 text-center text-gray-500 text-sm'>
                    <p>© {new Date().getFullYear()} NEAR ABAC. All rights reserved.</p>
                    <div className="mt-2 space-x-4">
                        <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer