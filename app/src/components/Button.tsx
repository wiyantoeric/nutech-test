import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
}

const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => {
    const baseStyles = 'w-full py-3 font-semibold rounded-md transition-colors transition-all active:scale-[0.98] disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-sims-red text-white hover:bg-red-700 disabled:bg-gray-50',
        outline: 'border border-sims-red text-sims-red hover:bg-red-50',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props} // Spreads onClick, disabled, type, etc.
        >
            {children}
        </button>
    );
};

export default Button;
