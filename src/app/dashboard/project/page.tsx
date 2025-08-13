import { Card } from '@/src/components/Card';
import { Project } from '@/src/modules/dashboard/project';
import { ProjectService } from '@/src/lib/project/Project.service';
import { TechstackService } from '@/src/lib/techstack/Techstack.service';
import { Suspense } from 'react';
import Loading from './loading';

export default async function ProjectPage() {

  const resultProjects = await new ProjectService().getAll();
  const resultTechStack = await new TechstackService().getAll();

  return <div className="mt-4">
    <h1 className="font-bold">Projects</h1>
    <Card title='List of projects' className="mt-12">
      <Card.header title='List of prjects' className='pb-4 font-medium text-base' />
      <Card.body>
        <Suspense fallback={<Loading />}>
          <Project projects={resultProjects.data ?? []} techstacks={resultTechStack.data} />
        </Suspense>
      </Card.body>
    </Card>
  </div>;
}