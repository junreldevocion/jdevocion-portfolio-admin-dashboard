import { handleStackFormSave, handleStackFormUpdate } from '@/src/app/dashboard/techstack/action';
import { StackFormState } from '@/src/app/dashboard/techstack/types';
import { ValidateInput } from '@/src/components/ValidateInput';
import { useActionState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const initialState: StackFormState = {
  name: '',
  errors: {},
  success: false,
  message: '',
  hasError: false,
  errorMessage: '',
};

interface StackFormProps {
  setHasError: (e: boolean) => void;
  initValues?: { name: string, id: number };
  mode?: 'create' | 'update';
}

export const StackForm = ({ setHasError, initValues, mode = 'create' }: StackFormProps) => {

  let handleFormAction = handleStackFormSave;
  if (mode === 'update') {
    handleFormAction = handleStackFormUpdate;
  }

  const [state, formAction, pending] = useActionState<StackFormState, FormData>(handleFormAction, initialState);

  const stackName = initValues?.name || '';
  const id = initValues?.id || 0;

  const { hasError, errorMessage, errors, name, success, message } = state;

  useEffect(() => {
    if (hasError || errorMessage) {
      setHasError(true);
    }

    if (success && message) {
      setHasError(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, errorMessage]);

  return <>
    <form className={twMerge('flex flex-col gap-4 mt-4')} action={formAction}>
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-col gap-2">
        <label className="text-sm">Name</label>
        <ValidateInput name='name' defaultValue={name || stackName} hasError={hasError || !!errorMessage} error={errors?.name?.[0]} placeholder='Enter stack' />
      </div>
      <div className="flex flex-col gap-2">
        <button type="submit" disabled={pending} className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50 ">Submit</button>
      </div>
    </form>
  </>;
};