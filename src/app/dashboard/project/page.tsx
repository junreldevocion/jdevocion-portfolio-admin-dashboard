import { Card } from '@/src/components/Card';
import { Project } from '@/src/modules/dashboard/project';
import { getProjects } from './action';
import { getTechStacks } from '../techstack/action';

export default async function ProjectPage() {

  const resultProjects = await getProjects();
  const resultTechStack = await getTechStacks();

  return <div className="mt-4">
    <h1 className="font-bold">Project</h1>
    <Card title='List of projects' className="mt-12">
      <Card.header title='List of prjects' className='pb-4 font-medium text-base' />
      <Card.body>
        <Project projects={resultProjects.projects} techstacks={resultTechStack.techStacks} />
      </Card.body>
    </Card>
  </div>;
}