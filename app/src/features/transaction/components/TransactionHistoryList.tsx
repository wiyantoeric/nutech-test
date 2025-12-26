import type { TransactionHistory } from '~/src/features/transaction/services/transactionService';

const TransactionHistoryList = ({ transactions }: { transactions: TransactionHistory[] }) => {
    if (transactions.length === 0) {
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
            {transactions.map((transaction) => {
                const isTopUp = transaction.transaction_type === 'TOPUP';

                return (
                    <div key={transaction.invoice_number} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                        <div className="space-y-1">
                            <p className={`text-xl font-bold ${isTopUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                {isTopUp ? '+ ' : '- '}
                                Rp {parseInt(transaction.total_amount).toLocaleString('id-ID')}
                            </p>
                            <p className="text-[10px] text-gray-400">{formatDate(transaction.created_on)}</p>
                        </div>
                        <p className="text-xs text-gray-700 font-medium">{transaction.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TransactionHistoryList;
