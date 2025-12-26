import type { Route } from '../../../+types/root';
import RegisterCard from '~/src/features/auth/components/RegisterCard';
import AuthBanner from './components/Banner';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

const RegisterPage = () => {
    return (
        <main className="h-dvh w-dvw grid grid-cols-1 md:grid-cols-2">
            <RegisterCard />
            <AuthBanner />
        </main>
    );
};

export default RegisterPage;
