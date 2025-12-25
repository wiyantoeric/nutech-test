import type { Route } from '../../+types/root';
import BalanceCard from '~/components/BalanceCard';
import ProfileCard from '~/components/ProfileCard';
import Navbar from '~/components/Navbar';
import TopupContainer from '~/components/TopupContainer';
import toast from 'react-hot-toast';
import { getServices, type Service } from '~/services/assets/services';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import ServiceContainer from '~/components/ServiceContainer';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

function ServicePage({ loaderData }: Route.ComponentProps) {
    const { serviceCode } = useParams();

    const [service, setService] = useState<Service | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await getServices();
                if (res.data.status === 0) {
                    if (!res.data.data) {
                        throw new Error('Terjadi kesalahan, silahkan coba kembali dalam beberapa saat');
                    }

                    const services = res.data.data;
                    const service = services.find((s) => s.service_code == serviceCode);

                    if (!service) {
                        navigate('/app');
                    }

                    setService(service as Service);
                }
            } catch (error) {
                toast.error('Gagal mengambil data layanan');
            }
        };

        fetchServices();
    }, []);

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

                {service && <ServiceContainer service={service} />}
            </main>
        </div>
    );
}

export default ServicePage;
