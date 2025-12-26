'use client';

import { useNavigate } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../components/Button';
import GuestNavbar from '../components/GuestNavbar';

const ErrorPage = ({ message, details, stack }: { message: any; details: any; stack: any }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <GuestNavbar />

            <main className="grow flex items-center justify-center px-4 py-12">
                <section className="max-w-md w-full text-center space-y-6">
                    {/* Error Sign */}
                    <div className="flex justify-center">
                        <div className="bg-red-50 p-6 rounded-full">
                            <AlertCircle size={64} className="text-sims-red" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <header className="space-y-2">
                        <h1 className="text-6xl font-black text-sims-red">{message}</h1>
                        <p className="">{details}</p>
                    </header>

                    {/* Action Call */}
                    <div className="pt-4">
                        <Button onClick={() => navigate('/app')} className="flex items-center justify-center gap-2">
                            Kembali ke Beranda
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ErrorPage;
