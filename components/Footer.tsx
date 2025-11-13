import React from "react"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0 mb-10">

                    <div className="flex flex-col gap-4">
                        <h2 className="text-white font-bold text-2xl">Shop</h2>
                        <p className="text-gray-400 max-w-sm">
                            Your one-stop online store for the latest fashion and accessories. Stylish, affordable, and delivered to your doorstep.
                        </p>
                    </div>


                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                        </ul>
                    </div>


                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-semibold text-lg">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                <Instagram className="w-5 h-5 text-pink-500"/>
                            </a>
                            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                <Facebook className="w-5 h-5 text-blue-500"/>
                            </a>
                            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                <Twitter className="w-5 h-5 text-blue-400"/>
                            </a>
                            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                                <Linkedin className="w-5 h-5 text-blue-600"/>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-800 my-6"></div>


                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} MyE-Mall. All rights reserved.</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
