import { CustomApiResponse } from '@/src/lib/types';
import { ProjectInput, ProjectUpadteInput } from './project.schema';
import { TechStackInput } from '../techstack/techstack.schema';

export type ProjectInputResponse = Omit<ProjectInput, 'file'> & { techStacks: TechStackInput[], imageUrl: string }
export type ProjectValidatedInput = Omit<ProjectInput, 'file'> & { file: string }
export type ProjectResponse = CustomApiResponse<ProjectInput, ProjectInputResponse, ProjectValidatedInput>

export type ProjectUpdateValidatedInput = Omit<ProjectUpadteInput, 'file'> & { file?: string | undefined }
export type ProjectUpdateInputResponse = Omit<ProjectUpadteInput, 'file'> & { techStacks: TechStackInput[], imageUrl: string }
export type ProjectUpdateResponse = CustomApiResponse<ProjectUpadteInput, ProjectUpdateInputResponse, ProjectUpdateValidatedInput>

export type GetProjectResponse = Pick<CustomApiResponse<unknown, ProjectInputResponse[], unknown>, 'data' | 'hasError'>