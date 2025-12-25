import { useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { getBalance } from '~/services/transactions/balances';
import { useDispatch, useSelector } from 'react-redux';
import type { AppState } from '~/store';
import { setBalance, toggleShowBalance } from '~/providers/walletSlice';
import { formatCurrency } from '~/utils/formatCurrency';

const BalanceCard = () => {
    const { balance, showBalance } = useSelector((state: AppState) => state.wallet);

    const dispatch = useDispatch();

    // Fetch balance on component mount
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await getBalance();
                if (res.data.status === 0) {
                    if (res.data.data.balance === undefined) {
                        throw new Error('Terjadi kesalahan, silahkan coba kembali dalam beberapa saat');
                    }

                    dispatch(setBalance(res.data.data.balance));
                }
            } catch (error) {
                toast.error('Gagal mengambil data saldo');
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="relative bg-[#f42619] rounded-2xl p-6 text-white overflow-hidden">
            {/* Background abstract waves/curves */}
            <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                    <circle cx="180" cy="20" r="80" stroke="white" strokeWidth="2" />
                    <circle cx="200" cy="50" r="80" stroke="white" strokeWidth="2" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div>
                    <p className="text-sm font-light opacity-90">Saldo anda</p>
                    <h2 className="text-3xl font-bold mt-2">Rp {showBalance ? (balance ? formatCurrency(balance) : '...') : '•••••••'}</h2>
                </div>

                <button onClick={() => dispatch(toggleShowBalance())} className="flex items-center gap-2 text-xs font-light hover:opacity-80 transition-opacity w-fit">
                    {showBalance ? (
                        <>
                            Sembunyikan Saldo <EyeOff size={14} />
                        </>
                    ) : (
                        <>
                            Lihat Saldo <Eye size={14} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BalanceCard;
