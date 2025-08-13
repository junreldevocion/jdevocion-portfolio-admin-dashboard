
import { TechStack } from '@/src/modules/dashboard/techstack';
import { Card } from '@/src/components/Card';
import { TechstackService } from '@/src/lib/techstack/Techstack.service';

export default async function TechStackPage() {

  const result = await new TechstackService().getAll();

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