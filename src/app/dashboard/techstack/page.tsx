
import { TechStack } from '@/src/modules/dashboard/techstack';
import { getTechStacks } from './action';
import { Card } from '@/src/components/Card';

export default async function TechStackPage() {

  const result = await getTechStacks();

  return (
    <div className="mt-4">
      <h1 className="font-bold">TechStack</h1>
      <Card title='List of technologies' className="mt-12">
        <Card.header title='List of technologies' className='pb-4 font-medium text-base' />
        <Card.body>
          <TechStack data={result.data} />
        </Card.body>
      </Card>
    </div>
  );
}