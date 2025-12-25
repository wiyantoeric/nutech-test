import type { Route } from '../../+types/root';
import BalanceCard from '~/components/BalanceCard';
import ProfileCard from '~/components/ProfileCard';
import Navbar from '~/components/Navbar';
import TopupContainer from '~/components/TopupContainer';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

function TopupPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
                {/* Profile & Balance Section */}
                <section className="flex flex-row flex-wrap gap-10 justify-between">
                    <div className="flex-1 sm:w-2/5">
                        <ProfileCard />
                    </div>
                    <div className="flex-1">
                        <BalanceCard />
                    </div>
                </section>

                <TopupContainer />
            </main>
        </div>
    );
}

export default TopupPage;
