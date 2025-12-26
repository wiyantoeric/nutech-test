import { AtSign, Eye, EyeOff, Lock, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '~/src/features/auth/services/authService';
import toast from 'react-hot-toast';
import Button from '~/src/components/Button';

function RegisterCard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });

    // Validate inputs
    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            toast.error('Parameter email tidak sesuai format');
            return false;
        }
        if (!formData.first_name || !formData.last_name) {
            toast.error('Nama depan dan belakang harus diisi');
            return false;
        }
        if (formData.password.length < 8) {
            toast.error('Password minimal 8 karakter');
            return false;
        }
        if (formData.password !== formData.confirm_password) {
            toast.error('Konfirmasi password tidak sama');
            return false;
        }
        return true;
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await register({
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                password: formData.password,
            });

            if (response.data.status === 0) {
                toast.success(response.data.message);
                setTimeout(() => navigate('/login'), 1500);
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Registrasi gagal, coba lagi dalam beberapa waktu';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-md flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-8 items-center">
                    <div className="flex items-center gap-2">
                        <img src="/assets/logo.png" alt="Logo" className="w-6 h-6" />
                        <h1 className="font-medium text-lg">SIMS PPOB</h1>
                    </div>
                    <h2 className="text-xl w-1/2 font-semibold text-center">Masuk atau Buat Akun untuk Memulai</h2>
                </div>

                {/* Register form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <AtSign size={16} />
                        </div>
                        <input
                            required
                            name="email"
                            type="text"
                            placeholder="masukan email anda"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={16} />
                        </div>
                        <input
                            required
                            name="first_name"
                            type="text"
                            placeholder="nama depan"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={16} />
                        </div>
                        <input
                            required
                            name="last_name"
                            type="text"
                            placeholder="nama belakang"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Lock size={16} />
                        </div>
                        <input
                            required
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="buat password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            onChange={handleChange}
                        />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Lock size={16} />
                        </div>
                        <input
                            name="confirm_password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="konfirmasi password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            onChange={handleChange}
                        />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Memproses...' : 'Registrasi'}
                    </Button>
                </form>

                {/* Link to login */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    sudah punya akun? login{' '}
                    <Link to="/login" className="text-red-500 font-bold">
                        di sini
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default RegisterCard;
