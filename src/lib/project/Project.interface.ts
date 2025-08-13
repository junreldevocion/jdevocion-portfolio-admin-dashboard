import { GetProjectResponse, ProjectResponse, ProjectUpdateResponse } from './types';

export interface IProject {
  createProject(input: FormData): Promise<ProjectResponse>
  updateProject(id: number, input: FormData): Promise<ProjectUpdateResponse>
  removeProject(id: number): Promise<ProjectResponse>
  getAll(): Promise<GetProjectResponse>
}