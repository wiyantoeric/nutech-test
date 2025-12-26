// Format number to IDR currency style
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
    }).format(amount);
};
