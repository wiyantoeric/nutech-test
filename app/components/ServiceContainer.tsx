import { useSelector, useDispatch } from 'react-redux';
import { Banknote } from 'lucide-react';
import type { AppState } from '~/store';
import type { Service } from '~/services/assets/services';
import toast from 'react-hot-toast';
import { createTransaction } from '~/services/transactions/transactions';
import { useNavigate } from 'react-router';

export default function ServiceContainer({ service }: { service: Service }) {
    const { balance } = useSelector((state: AppState) => state.wallet);
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!balance) return;

        if (balance < Number(service.service_tariff)) {
            toast.error('Saldo Anda tidak menckupi');
        }

        const res = await createTransaction({ serviceCode: service.service_code });

        if (res.data.status === 0) {
            toast.success(`Berhasil membayar tagihan ${service.service_name}`);
            navigate('/app');
        } else {
            toast.error('Gagal membayar, silahkan coba lagi dalam beberapa saat');
        }
    };

    if (!service) return <div className="p-8 text-center">Layanan tidak ditemukan</div>;

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <p className="text-gray-600">Pembayaran</p>
                <div className="flex items-center gap-3">
                    <img src={service.service_icon} className="w-8 h-8" alt={service.service_name} />
                    <h2 className="text-2xl font-bold">{service.service_name}</h2>
                </div>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Banknote size={18} />
                    </span>
                    <input type="text" readOnly value={service.service_tariff.toLocaleString()} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-gray-50 font-medium" />
                </div>

                <button onClick={handlePayment} className="w-full py-3 bg-[#f42619] text-white font-semibold rounded-md hover:bg-red-700 transition-colors">
                    Bayar
                </button>
            </div>
        </div>
    );
}
