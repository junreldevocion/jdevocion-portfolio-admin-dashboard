import { addProject, updateProject } from '@/src/app/dashboard/project/action';
import { ValidateInput } from '@/src/components/ValidateInput';
import { Messages } from '@/src/lib/constants/Messages';
import { ProjectInputResponse, ProjectResponse } from '@/src/lib/project/types';
import { TechStackInput } from '@/src/lib/techstack/techstack.schema';
import Image from 'next/image';
import { useActionState, useEffect, useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

interface ProjectFormProps {
  initValues?: ProjectInputResponse
  mode: 'create' | 'update',
  techstacks?: TechStackInput[],
  onClose: (e: boolean) => void
}

const initiFormValues = {
  errorMessage: '',
  hasError: false
};

export const ProjectForm: React.FC<ProjectFormProps> = ({ initValues, mode = 'create', techstacks, onClose }) => {

  let handleFormAction = addProject;
  if (mode === 'update') handleFormAction = updateProject;

  const [state, formAction, pending] = useActionState<ProjectResponse, FormData>(handleFormAction, initiFormValues);

  const [techStackOptionsIds, setTechStackOptionsIds] = useState<number[]>([]);
  const [preview, setPreview] = useState<string | null>(initValues?.imageUrl ?? null);

  const { message, hasError, errors, fields, data } = state;

  useEffect(() => {
    if (hasError && message) {
      onClose(true);
    }

    if (!hasError && data) {
      onClose(false);
      let message = Messages.CREATED_PROJECT_MESSAGE;
      if (mode === 'update') {
        message = Messages.UPDATED_PROJECT_MESSAGE;
      }
      toast.success(message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, message, data]);

  const techstackOptions = useMemo(() => {
    return (techstacks)?.map((tech) => {
      return {
        value: tech.id,
        label: tech.name
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initValuesOptions = useMemo(() => {
    return initValues?.techStacks.map((tech) => {
      return {
        value: tech.id,
        label: tech.name
      };
    });
  }, [initValues?.techStacks]);

  const handleSelectedOptions = (selectedOptions: MultiValue<{ value: number | undefined; label: string }>): void => {
    const optionsValues = selectedOptions.map((opt) => opt.value);
    setTechStackOptionsIds(optionsValues as number[]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return <form action={formAction} className='flex flex-col gap-4'>
    {hasError && message && <div className="text-red-500 text-sm ti">{message}</div>}
    {mode === 'update' && <input name="id" type='hidden' value={initValues?.id} />}
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Title</label>
      <ValidateInput name='title' defaultValue={fields?.title ?? initValues?.title} hasError={!!(hasError && errors?.title)} placeholder='Enter title' error={errors?.title} />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Description</label>
      <ValidateInput inputType="textarea" name='description' hasError={!!(hasError && errors?.description)} error={errors?.description} defaultValue={fields?.description ?? initValues?.description} placeholder='Enter description' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">GithubUrl</label>
      <ValidateInput name='githubUrl' hasError={!!(hasError && errors?.githubUrl)} error={errors?.githubUrl} defaultValue={fields?.githubUrl ?? initValues?.githubUrl} placeholder='Enter githubUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">LiveDemoUrl</label>
      <ValidateInput name='liveDemoUrl' hasError={!!(hasError && errors?.liveDemoUrl)} error={errors?.liveDemoUrl} defaultValue={fields?.liveDemoUrl ?? initValues?.liveDemoUrl} placeholder='Enter liveDemoUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Image</label>
      {preview && (
        <Image src={preview} alt='preview' width={100} height={100} />
      )}
      <ValidateInput name='file' onChange={handleFileChange} hasError={!!(hasError && errors?.file)} error={errors?.file as unknown as string} type='file' placeholder='Enter liveDemoUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Select tectstacks</label>
      <input type='hidden' name='techStackIds' value={JSON.stringify(techStackOptionsIds)} />
      <Select defaultValue={[...initValuesOptions ?? []]} className={twMerge(!!(hasError && errors?.techStackIds) ? 'rounded border border-red-400 ' : '')} isMulti options={techstackOptions} onChange={handleSelectedOptions} />
    </div>
    <div className="flex flex-col gap-2">
      <button type="submit" disabled={pending} className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50 ">Submit</button>
    </div>
  </form>;
};