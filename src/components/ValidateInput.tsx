
import { twMerge } from 'tailwind-merge';

interface ValidateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hasError?: boolean;
}

export const ValidateInput = ({ hasError, error, ...props }: ValidateInputProps) => {
  return (
    <>
      <input {...props} className={twMerge(
        'p-2 border rounded border-indigo-50 text-sm',
        hasError && 'border-red-400'
      )} />
      {hasError && <span className="text-red-400 text-sm font-extralight">{error}</span>}
    </>
  );
};