'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/src/slices/authSlice';
import type { AppState, AppDispatch } from '~/store';
import { useEffect, useRef } from 'react';
import { getProfile, updateProfileImage } from '~/src/features/auth/services/userService';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import AccountDetail from './AccountDetail';
import AccountForm from './AccountForm';

const AccountContainer = () => {
    const { isEditing } = useSelector((state: AppState) => state.account);
    const { user } = useSelector((state: AppState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getProfile();
                if (!res.data || !res.data.data) return;
                dispatch(setUser({ user: res.data.data }));
            } catch (error) {
                toast.error('Gagal mengambil data user');
            }
        };

        fetchUser();
    }, [dispatch]);

    // Handle edit button click
    const handleEditPhotoClick = () => {
        fileInputRef.current?.click();
    };

    // Handle photo upload
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Ensure file is an image
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Format file harus JPEG atau PNG');
            return;
        }

        // Limit file size to 100kB
        if (file.size > 102400) {
            toast.error('Ukuran file maksimal 100KB');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const loadingToast = toast.loading('Mengunggah foto...');

        try {
            const res = await updateProfileImage(formData);
            if (res.data.status === 0) {
                dispatch(setUser({ user: res.data.data! }));
                toast.success('Foto profil berhasil diperbarui', { id: loadingToast });
            } else {
                toast.error(res.data.message, { id: loadingToast });
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Gagal mengunggah foto';
            toast.error(errorMsg, { id: loadingToast });
        } finally {
            // Reset input so the same file can be selected again if needed
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Profile Image Section */}
            <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={user?.profile_image && !user.profile_image.includes('null') ? user.profile_image : '/assets/images/profile-photo.png'} alt="Profile" className="w-full h-full object-cover" />
                </div>

                <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png" onChange={handleImageChange} />

                {/* Edit Icon Overlay */}
                <button onClick={handleEditPhotoClick} className="absolute bottom-1 right-1 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                    <Pencil size={14} className="text-gray-600" />
                </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-10">
                {user?.first_name} {user?.last_name}
            </h1>

            {/* Account edit and detail */}
            {isEditing ? <AccountForm /> : <AccountDetail />}
        </div>
    );
};

export default AccountContainer;
