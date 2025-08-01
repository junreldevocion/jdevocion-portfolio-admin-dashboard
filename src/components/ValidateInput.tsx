
import { twMerge } from 'tailwind-merge';

interface ValidateInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: string;
  hasError?: boolean;
  inputType?: 'input' | 'textarea'
}

export const ValidateInput = ({ hasError, error, inputType = 'input', ...props }: ValidateInputProps) => {
  return (
    <>
      {inputType === 'input' ? <input {...props} className={twMerge(
        'p-2 border rounded border-indigo-50 text-sm',
        hasError && 'border-red-400'
      )} /> : <textarea className='p-2 border rounded border-indigo-50 text-sm' {...props} />}
      {hasError && <span className="text-red-400 text-sm font-extralight">{error}</span>}
    </>
  );
};