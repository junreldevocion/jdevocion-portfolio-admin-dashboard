import { addProject, updateProject } from '@/src/app/dashboard/project/action';
import { ProjectTypeProps } from '@/src/app/dashboard/project/types';
import { TechStackTypeProps } from '@/src/app/dashboard/techstack/types';
import { ValidateInput } from '@/src/components/ValidateInput';
import { ApiResponse } from '@/src/types';
import { useActionState } from 'react';
import Select, { MultiValue } from 'react-select';

interface ProjectFormProps {
  initValues?: ProjectTypeProps
  mode: 'create' | 'update',
  techstacks?: TechStackTypeProps[]
}

const initiFormValues = {
  data: {
    title: '',
    description: '',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    techStacks: []
  },
  errorMessage: '',
  hasError: false
};

export const ProjectForm: React.FC<ProjectFormProps> = ({ initValues, mode = 'create', techstacks }) => {

  let handleFormAction = addProject;
  if (mode === 'update') handleFormAction = updateProject;

  const [state, formAction, pending] = useActionState<ApiResponse<ProjectTypeProps, ProjectTypeProps>, FormData>(handleFormAction, initiFormValues);

  const { errorMessage, data } = state;

  const options = techstacks?.map((tech) => {
    return {
      value: tech.name,
      label: tech.name
    };
  });

  const handleSelectedOptions = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    console.log(selectedOptions, 'selectedOptions');
  };

  return <form action={formAction} className='flex flex-col gap-4'>
    {errorMessage && <div className="text-red-500 text-sm ti">{errorMessage}</div>}
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Title</label>
      <ValidateInput name='title' defaultValue={data?.title ?? initValues?.title} placeholder='Enter title' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Description</label>
      <ValidateInput inputType="textarea" name='description' defaultValue={data?.title ?? initValues?.title} placeholder='Enter description' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">GithubUrl</label>
      <ValidateInput name='githubUrl' defaultValue={data?.title ?? initValues?.title} placeholder='Enter githubUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">LiveDemoUrl</label>
      <ValidateInput name='liveDemoUrl' defaultValue={data?.title ?? initValues?.title} placeholder='Enter liveDemoUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Image</label>
      <ValidateInput name='imageFile' type='file' defaultValue={data?.title ?? initValues?.title} placeholder='Enter liveDemoUrl' />
    </div>
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm">Select tectstacks</label>
      <Select isMulti options={options} onChange={handleSelectedOptions} />
    </div>
    <div className="flex flex-col gap-2">
      <button type="submit" disabled={pending} className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50 ">Submit</button>
    </div>
  </form>;
};