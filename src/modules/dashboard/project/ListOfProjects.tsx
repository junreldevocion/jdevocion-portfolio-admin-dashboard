
import { removeProject } from '@/src/app/dashboard/project/action';
import { ProjectTypeProps } from '@/src/app/dashboard/project/types';
import { Button } from '@/src/components/Button';
import Image from 'next/image';
import { toast } from 'sonner';

interface ListOfProjects {
  project: ProjectTypeProps
  onEdit: (data: ProjectTypeProps) => void
}

export const ListOfProjects: React.FC<ListOfProjects> = ({ project, onEdit }) => {

  const { imageUrl, title, description, techStacks, id } = project;

  const handleRemoveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await removeProject(id ?? 0);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

  };
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-50 rounded-lg shadow">
      <Image src={imageUrl} width={400} height={400} className='rounded' alt='project-image' />
      <h1 className='text-base font-semibold'>{title}</h1>
      <p className='text-sm text-gray-500'>{description}</p>
      <ul className='flex flex-row gap-2'>
        {techStacks.map((stack) => {
          const { name, id } = stack;
          return (
            <li key={id} className='border border-indigo-50 px-2 py-1 rounded text-sm font-light text-gray-500'>{name}</li>
          );
        })}
      </ul>
      <div className='flex flex-row gap-2'>
        <form onSubmit={handleRemoveProject} className='w-fit'>
          <Button size="sm" variant='danger' type='submit'>Delete</Button>
        </form>
        <Button size='sm' onClick={() => onEdit(project)}>Edit</Button>
      </div>
    </div>
  );
};