import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import type { AppState } from '../store';

export default function AuthLayout() {
    const [isReady, setIsReady] = useState(false);

    const { isAuthenticated } = useSelector((state: AppState) => state.auth);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }

    return <Outlet />;
}
