import AccountContainer from '~/src/features/auth/components/AccountContainer';
import Navbar from '~/src/components/Navbar';
import type { Route } from '../../../+types/root';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

const AccountPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container mx-auto px-4 py-12 flex justify-center">
                <AccountContainer />
            </main>
        </div>
    );
};

export default AccountPage;
