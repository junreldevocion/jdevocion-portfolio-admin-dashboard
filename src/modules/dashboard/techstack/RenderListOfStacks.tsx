
import { deleteTechstack } from '@/src/app/dashboard/techstack/action';
import { Button } from '@/src/components/Button';
import { TechStackInput } from '@/src/lib/techstack/techstack.schema';
import { format } from 'date-fns';

interface ListOfStacksProps {
  stack: TechStackInput;
  onEdit: (stack: TechStackInput) => void;
}

export const RenderListOfStacks = ({ stack, onEdit }: ListOfStacksProps) => {
  const { name, createdAt, createdBy, id } = stack;
  const createdByName = [createdBy].map(user => `${user?.firstname} ${user?.lastname}`).join(', ');

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the delete function here, passing the id
    await deleteTechstack(id ?? 0);
  };

  return <>
    <tr className="text-left border-b border-indigo-100">
      <td className="p-4">{name}</td>
      <td className="p-4">{format(new Date(createdAt ?? new Date()), 'MM/dd/yyyy')}</td>
      <td className="p-4">{createdByName}</td>
      <td className="p-4 flex gap-2">
        <form className='w-fit' onSubmit={handleDelete}>
          <Button size="sm" variant='danger' type='submit'>Delete</Button>
        </form>
        <Button size='sm' type='button' onClick={() => onEdit(stack)}>Edit</Button>
        {/* <form className='w-fit'>
        </form> */}
      </td>
    </tr>
  </>;
};