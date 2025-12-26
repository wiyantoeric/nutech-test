import React from 'react';

interface ChipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: number;
}

const ChipButton = ({ value, className = '', ...props }: ChipButtonProps) => {
    return (
        <button
            type="button"
            className={`py-3 border border-gray-300 rounded-md text-sm text-gray-700 
      hover:bg-gray-100 transition-colors cursor-pointer text-center ${className}`}
            {...props}
        >
            Rp{value.toLocaleString('id-ID')}
        </button>
    );
};

export default ChipButton;
