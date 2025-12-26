'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '~/src/components/Navbar';
import BalanceCard from '~/src/features/wallet/components/BalanceCard';
import toast from 'react-hot-toast';
import { getTransactionHistory, type TransactionHistory } from '~/src/features/transaction/services/transactionService';
import TransactionHistoryList from '~/src/features/transaction/components/TransactionHistoryList';
import type { Route } from '../../../+types/root';
import ProfileCard from '../auth/components/ProfileCard';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const initialized = useRef(false);

    const LIMIT = 5;

    const fetchHistory = async (currentOffset: number) => {
        setLoading(true);
        try {
            const res = await getTransactionHistory(currentOffset, LIMIT);
            if (res.data.status === 0) {
                const newRecords = res.data.data.records || [];
                setTransactions((prev) => [...prev, ...newRecords]);

                // If the records returned are less than the limit, we reached the end
                if (newRecords.length < LIMIT) {
                    setHasMore(false);
                }
            }
        } catch (err) {
            toast.error('Gagal memuat riwayat transaksi');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            fetchHistory(0);
        }
    }, []);

    const handleShowMore = () => {
        const nextOffset = offset + LIMIT;
        setOffset(nextOffset);
        fetchHistory(nextOffset);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <div className="lg:col-span-2">
                        <ProfileCard />
                    </div>
                    <div className="lg:col-span-3">
                        <BalanceCard />
                    </div>
                </div>

                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Semua Transaksi</h3>

                    <TransactionHistoryList transactions={transactions} />

                    {hasMore && (
                        <div className="text-center pt-4">
                            <button onClick={handleShowMore} disabled={loading} className="text-sims-red font-semibold text-sm hover:underline disabled:text-gray-400">
                                {loading ? 'Loading...' : 'Show More'}
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default TransactionsPage;
