import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  children?: React.ReactNode;
}

export const Button = ({ className, size = 'md', variant = 'primary', children, ...props }: ButtonProps) => {

  const handleSizeClasses = () => {
    if (!size) return 'px-4 py-2 text-base'; // Default size
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
    }
  };

  const handleVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-400 hover:bg-indigo-600';
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600';
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-indigo-400 hover:bg-indigo-500'; // Default variant
    }
  };

  return (
    <button className={twMerge('bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50', handleVariantClasses(), handleSizeClasses(), className)} {...props}>
      {children}
    </button>
  );
};