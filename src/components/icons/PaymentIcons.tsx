import Image from 'next/image';

interface PaymentIconProps {
    size?: 16 | 24 | 48;
    className?: string;
}

export const VisaIcon = ({ size = 24, className }: PaymentIconProps) => (
    <Image
        src={`/icons/payment_icons/visa/Size=${size}.svg`}
        alt="Visa"
        width={size === 16 ? 23 : size === 24 ? 35 : 70}
        height={size}
        className={className}
    />
);

export const MastercardIcon = ({ size = 24, className }: PaymentIconProps) => (
    <Image
        src={`/icons/payment_icons/mastercard/Size=${size}.svg`}
        alt="Mastercard"
        width={size === 16 ? 23 : size === 24 ? 35 : 70}
        height={size}
        className={className}
    />
);

export const AmexIcon = ({ size = 24, className }: PaymentIconProps) => (
    <Image
        src={`/icons/payment_icons/amex/Size=${size}.svg`}
        alt="American Express"
        width={size === 16 ? 23 : size === 24 ? 35 : 70}
        height={size}
        className={className}
    />
);

export const ApplePayIcon = ({ size = 24, className }: PaymentIconProps) => (
    <Image
        src={`/icons/payment_icons/applepay/Size=${size}.svg`}
        alt="Apple Pay"
        width={size === 16 ? 23 : size === 24 ? 35 : 70}
        height={size}
        className={className}
    />
);

export const GooglePayIcon = ({ size = 24, className }: PaymentIconProps) => (
    <Image
        src={`/icons/payment_icons/gpay/Size=${size}.svg`}
        alt="Google Pay"
        width={size === 16 ? 23 : size === 24 ? 35 : 70}
        height={size}
        className={className}
    />
);
