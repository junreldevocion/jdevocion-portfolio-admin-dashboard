import { TechStackTypeProps } from '../techstack/types';

export type ProjectTypeProps = {
  id?: number;
  title: string;
  description: string;
  githubUrl: string;
  liveDemoUrl: string;
  imageUrl: string;
  techStacks: TechStackTypeProps[];
}