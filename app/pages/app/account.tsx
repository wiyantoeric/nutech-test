'use client';

import AccountContainer from '~/components/AccountContainer';
import Navbar from '~/components/Navbar';
import type { Route } from '../../+types/root';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

export default function AccountPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container mx-auto px-4 py-12 flex justify-center">
                <AccountContainer />
            </main>
        </div>
    );
}
