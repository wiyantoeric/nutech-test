'use client';

import { Link, useLocation } from 'react-router';

const GuestNavbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks: { path: string; name: string }[] = [{ name: 'Sign In', path: '/register' }];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white border-gray-100 px-4 md:px-8 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link to="/app" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="Logo" className="w-6 h-6" />
                    <span className="text-lg font-bold tracking-tight text-gray-900">SIMS PPOB</span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className={`text-sm font-semibold transition-colors hover:text-sims-red ${isActive(link.path) ? 'text-sims-red' : 'text-gray-700'}`}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default GuestNavbar;
