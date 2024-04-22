import { Loader2, LogOut } from 'lucide-react';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'blue' | 'white';
type ButtonType = 'button' | 'submit' | undefined;
type IconVariant = 'logout';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | null;
  className?: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  Icon?: IconVariant;
  type?: ButtonType;
  onClick?: () => void;
}

const ButtonVariantClasses: Record<ButtonVariant, string> = {
  blue: 'bg-blue text-white border-blue disabled:bg-white',
  white: 'border-gray',
};

const getIconVariant = (Icon: IconVariant) => {
  if (Icon === 'logout') return <LogOut />;
  return null;
};

export const Button = ({
  children,
  className = '',
  variant = 'blue',
  isLoading = false,
  Icon,
  type = 'button',
  onClick,
  ...buttonProps
}: ButtonProps) => {
  const ButtonVariantClassName = ButtonVariantClasses[variant];

  return (
    <button
      className={`${className} ${ButtonVariantClassName} inline-flex items-center justify-center rounded-md text-sm gap-2 font-medium transition-color focus:outline-none focus:ring-2focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2.5 h-full border`}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {!isLoading && Icon && getIconVariant(Icon)}
      {children}
    </button>
  );
};
