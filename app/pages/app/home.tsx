import type { Route } from '../../+types/root';
import ServiceList from '~/components/ServiceList';
import PromotionList from '~/components/PromotionList';
import BalanceCard from '~/components/BalanceCard';
import ProfileCard from '~/components/ProfileCard';
import Navbar from '~/components/Navbar';

export function meta({}: Route.MetaArgs) {
return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

function AppHomePage() {
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

                {/* Services Loop */}
                <ServiceList />

                {/* Promotions Loop */}
                <section className="space-y-4">
                    <h3 className="font-bold text-gray-800">Temukan promo menarik</h3>
                    <PromotionList />
                </section>
            </main>
        </div>
    );
}

export default AppHomePage;
