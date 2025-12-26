import type { Route } from '../../../+types/root';
import BalanceCard from '~/src/features/wallet/components/BalanceCard';
import Navbar from '~/src/components/Navbar';
import toast from 'react-hot-toast';
import { getServices, type Service } from '~/src/features/app/services/serviceService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ServiceContainer from '~/src/features/app/components/ServiceContainer';
import ProfileCard from '../auth/components/ProfileCard';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

const ServicePage = () => {
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
};

export default ServicePage;
