import { User, AtSign, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toggleEditMode } from '~/providers/accountSlice';
import { logout } from '~/providers/authSlice';
import type { AppState } from '~/store';

function AccountDetail() {
    const { user } = useSelector((state: AppState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="w-full space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Email</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <AtSign size={16} />
                    </span>
                    <input type="email" readOnly value={user?.email || ''} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded focus:outline-none bg-white text-gray-600 cursor-default" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Nama Depan</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <User size={16} />
                    </span>
                    <input type="text" readOnly value={user?.first_name || ''} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded focus:outline-none bg-white text-gray-600 cursor-default" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Nama Belakang</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <User size={16} />
                    </span>
                    <input type="text" readOnly value={user?.last_name || ''} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded focus:outline-none bg-white text-gray-600 cursor-default" />
                </div>
            </div>

            {/* Actions */}
            <div className="w-full pt-8 space-y-4">
                <button onClick={() => dispatch(toggleEditMode())} className="w-full py-3 border border-[#f42619] text-[#f42619] font-bold rounded hover:bg-red-50 transition-colors cursor-pointer">
                    Edit Profile
                </button>
                <button onClick={handleLogout} className="w-full py-3 bg-[#f42619] text-white font-bold rounded hover:bg-red-700 transition-all active:scale-[0.98]">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AccountDetail;
