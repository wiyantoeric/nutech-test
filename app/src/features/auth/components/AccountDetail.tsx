import { User, AtSign, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '~/src/components/Button';
import { toggleEditMode } from '~/src/slices/accountSlice';
import { logout } from '~/src/slices/authSlice';
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
                <Button variant="outline" onClick={() => dispatch(toggleEditMode())}>
                    Edit Profile
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}

export default AccountDetail;
