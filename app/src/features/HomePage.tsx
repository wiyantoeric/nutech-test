import { Navigate } from 'react-router';
import type { Route } from '../../+types/root';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

function HomePage() {
    return <Navigate to="/register"></Navigate>;
}

export default HomePage;
