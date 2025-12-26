'use client';

import React, { useState, useEffect } from 'react';
import { Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { topUp } from '~/src/features/wallet/services/balanceService';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '~/src/slices/walletSlice';
import Button from '~/src/components/Button';
import ChipButton from '~/src/components/ChipButton';

const AMOUNT_OPTIONS = [10000, 20000, 50000, 100000, 250000, 500000];

const TopupContainer= () => {
    const MIN_AMOUNT = 10000;
    const MAX_AMOUNT = 1000000;

    const [rawAmount, setRawAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const formatDisplay = (val: string) => {
        if (!val) return '';
        const number = parseInt(val.replace(/\D/g, ''), 10);
        if (isNaN(number)) return '';
        return number.toLocaleString('id-ID');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setRawAmount(value);
    };

    const handleTopup = async (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = Number(rawAmount);

        if (numAmount < MIN_AMOUNT || numAmount > MAX_AMOUNT) {
            toast.error(`Nominal minimal Rp 10.000 dan maksimal Rp 1.000.000`);
            return;
        }

        setLoading(true);

        try {
            const res = await topUp({ amount: numAmount });

            if (res.data.status === 0) {
                toast.success('Top Up Berhasil!');
                setRawAmount('');
                dispatch(setBalance(res.data.data.balance!));
            } else {
                toast.error(res.data.message);
            }
        } catch (err: any) {
            toast.error('Gagal Top Up, silahkan coba lagi dalam beberapa saat');
        }

        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Banknote size={18} />
                    </span>
                    <input
                        type="text" // Changed to text to allow formatted characters like dots
                        value={formatDisplay(rawAmount)}
                        onChange={handleChange}
                        placeholder="masukan nominal Top Up"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>
                <Button onClick={handleTopup} disabled={!rawAmount || loading}>
                    {loading ? 'Memproses...' : 'Top Up'}
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {AMOUNT_OPTIONS.map((option) => (
                    <ChipButton key={option} value={option} onClick={() => setRawAmount(option.toString())} />
                ))}
            </div>
        </div>
    );
}

export default TopupContainer;
