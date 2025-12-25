'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'Top Up', path: '/app/top-up' },
        { name: 'Transaction', path: '/app/transactions' },
        { name: 'Akun', path: '/app/account' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white border-gray-100 px-4 md:px-8 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link to="/app" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="Logo" className="w-6 h-6" />
                    <span className="text-lg font-bold tracking-tight text-gray-900">SIMS PPOB</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className={`text-sm font-semibold transition-colors hover:text-[#f42619] ${isActive(link.path) ? 'text-[#f42619]' : 'text-gray-700'}`}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(true)}>
                    <Menu size={24} />
                </button>
            </div>

            <div className={`fixed inset-0 z-60 transition-all duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />

                {/* Navigation */}
                <div className={`absolute right-0 h-full w-72 bg-white shadow-2xl flex flex-col p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end mb-10">
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 p-1">
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-xl font-bold transition-colors ${isActive(link.path) ? 'text-[#f42619]' : 'text-gray-800'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
