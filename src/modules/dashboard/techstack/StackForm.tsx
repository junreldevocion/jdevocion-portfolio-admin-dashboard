import { handleStackFormSave, handleStackFormUpdate } from '@/src/app/dashboard/techstack/action';
import { TechstackServerResponse } from '@/src/app/dashboard/techstack/types';
import { ValidateInput } from '@/src/components/ValidateInput';
import { TechStackInput } from '@/src/lib/schema/techstack.schema';
import { useActionState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const initialState: TechstackServerResponse = {
  fields: {
    name: ''
  },
  hasError: false
};

interface StackFormProps {
  setHasError: (e: boolean) => void;
  editValues?: TechStackInput;
  mode?: 'create' | 'update';
}

export const StackForm = ({ setHasError, editValues, mode = 'create' }: StackFormProps) => {

  let handleFormAction = handleStackFormSave;
  if (mode === 'update') {
    handleFormAction = handleStackFormUpdate;
  }

  const [state, formAction, pending] = useActionState<TechstackServerResponse, FormData>(handleFormAction, initialState);

  const stackName = editValues?.name || '';
  const id = editValues?.id || 0;

  const { hasError, message, fields, errors, data } = state;

  console.log(fields, 'fields');

  useEffect(() => {
    if (hasError && message) {
      setHasError(true);
    }

    if (!hasError && data) {
      setHasError(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, message, data]);

  return <>
    <form className={twMerge('flex flex-col gap-4 mt-4')} action={formAction}>
      {hasError && message && <div className="text-red-500 text-sm">{message}</div>}
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-col gap-2">
        <label className="text-sm">Name</label>
        <ValidateInput name='name' defaultValue={fields?.name || stackName} hasError={hasError} error={errors?.name} placeholder='Enter stack' />
      </div>
      <div className="flex flex-col gap-2">
        <button type="submit" disabled={pending} className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50 ">Submit</button>
      </div>
    </form>
  </>;
};