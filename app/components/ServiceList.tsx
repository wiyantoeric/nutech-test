import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { getServices, type Service } from '~/services/assets/services';

const ServiceList = () => {
    const [services, setServices] = useState<Service[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await getServices();
                if (res.data.status === 0) {
                    if (!res.data.data) {
                        throw new Error('Terjadi kesalahan, silahkan coba kembali dalam beberapa saat');
                    }
                    setServices(res.data.data);
                }
            } catch (error) {
                toast.error('Gagal mengambil data layanan');
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {services.map((service: any) => (
                <a key={service.service_code} href={`/app/service/${service.service_code}`} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <img src={service.service_icon} alt={service.service_name} className="w-10 h-10 group-hover:shadow-md group-hover:-translate-y-1 transition-all" />
                    <p className="text-[10px] text-center text-gray-600 leading-tight">{service.service_name}</p>
                </a>
            ))}
        </div>
    );
};

export default ServiceList;
