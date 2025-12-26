import LoginCard from './components/LoginCard';
import AuthBanner from './components/Banner';
import type { Route } from '../../../+types/root';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

const LoginPage = () => {
    return (
        <main className="h-dvh w-dvw grid grid-cols-1 md:grid-cols-2">
            <LoginCard />
            <AuthBanner />
        </main>
    );
};

export default LoginPage;
