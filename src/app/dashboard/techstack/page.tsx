
import { TechStack } from '@/src/modules/dashboard/techstack';
import { getTechStacks } from './action';

export default async function TechStackPage() {

  const result = await getTechStacks();

  return <div className="mt-4">
    <h1 className="font-bold">TechStack</h1>
    <TechStack data={result.techStacks} />
  </div>;
}