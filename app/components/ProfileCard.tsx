'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { AppState } from '../store';
import { use, useEffect, useState } from 'react';
import { getProfile, type User } from '~/services/user';
import { setUser } from '~/providers/authSlice';
import toast from 'react-hot-toast';

/**
 * Component to display the user's greeting and profile picture.
 */
export default function ProfileCard() {
    const { user } = useSelector((state: AppState) => state.auth);
    const dispatch = useDispatch();

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
    }, []);

    return (
        <div className="space-y-3">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                <img src={user?.profile_image && !user.profile_image.includes('null') ? user.profile_image : '/assets/images/profile-photo.png'} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Greeting Text */}
            <div className="space-y-1">
                <p className="text-gray-500 text-lg text-nowrap">Selamat datang,</p>
                <h1 className="text-3xl font-semibold text-gray-900 wrap-break-word">
                    {user?.first_name} {user?.last_name}
                </h1>
            </div>
        </div>
    );
}
