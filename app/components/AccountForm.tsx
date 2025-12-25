'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { User, AtSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateProfile } from '~/services/user';
import { setUser } from '~/providers/authSlice';
import type { AppState, AppDispatch } from '~/store';
import { toggleEditMode } from '~/providers/accountSlice';

export default function AccountForm() {
    const { user } = useSelector((state: AppState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Initialize local state with current user data
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name) {
            toast.error('Nama depan dan belakang harus diisi');
            return;
        }

        setLoading(true);
        try {
            const res = await updateProfile(formData);

            if (res.data.status === 0) {
                dispatch(setUser({ user: res.data.data! }));
                toast.success('Profil berhasil diperbarui');
                navigate('/app/account');
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Gagal memperbarui profil';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Email</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <AtSign size={16} />
                    </span>
                    <input type="email" disabled value={user?.email || ''} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Nama Depan</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <User size={16} />
                    </span>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="masukan nama depan anda"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Nama Belakang</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <User size={16} />
                    </span>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="masukan nama belakang anda"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        required
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="w-full pt-8 space-y-4">
                <button onClick={() => dispatch(toggleEditMode())} className="w-full py-3 border border-[#f42619] text-[#f42619] font-bold rounded hover:bg-red-50 transition-colors">
                    Batalkan
                </button>

                <button type="submit" disabled={loading} className="w-full py-3 bg-[#f42619] text-white font-bold rounded hover:bg-red-700 transition-all active:scale-[0.98] disabled:bg-gray-400">
                    {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
