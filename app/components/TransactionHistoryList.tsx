import type { TransactionHistory } from '~/services/transactions/transactions';

export default function TransactionHistoryList({ records }: { records: TransactionHistory[] }) {
    if (records.length === 0) {
        return <p className="text-center text-gray-500 py-10">Belum ada riwayat transaksi</p>;
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date
            .toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
            })
            .replace('pukul', '');
    };

    return (
        <div className="space-y-4">
            {records.map((item) => {
                const isTopUp = item.transaction_type === 'TOPUP';

                return (
                    <div key={item.invoice_number} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                        <div className="space-y-1">
                            <p className={`text-xl font-bold ${isTopUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                {isTopUp ? '+ ' : '- '}
                                Rp {parseInt(item.total_amount).toLocaleString('id-ID')}
                            </p>
                            <p className="text-[10px] text-gray-400">{formatDate(item.created_on)}</p>
                        </div>
                        <p className="text-xs text-gray-700 font-medium">{item.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
