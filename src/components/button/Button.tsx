import type { PropsWithChildren } from 'react';
import './Button.css';

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: 'default' | 'primary' | 'danger';
    ariaLabel?: string;
    ariaBusy?: boolean;
    icon?: React.ReactNode;
}

const Button = ({
    children,
    onClick,
    disabled = false,
    loading = false,
    type = 'default',
    ariaLabel,
    ariaBusy,
    icon,
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-${type}`}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-busy={ariaBusy || loading}
        >
            {loading && <span className="spinner" aria-hidden />}
            <span className="btn-text">
                {icon && <span className="btn-icon">{icon}</span>}
                {children}
            </span>
        </button>
    );
};

export default Button;
