
import { TechStackInput } from '../techstack/techstack.schema';
import { CustomApiResponse } from '@/src/lib/types';

export type TechstackResponse = CustomApiResponse<TechStackInput, TechStackInput>

export type GetTechstackResponse = Pick<CustomApiResponse<unknown, TechStackInput[]>, 'data' | 'hasError'>

export type DeleteTechstackResponse = Pick<CustomApiResponse<unknown, unknown>, 'data' | 'hasError' | 'message'>

export interface ITechstack {
  createTechstack(input: unknown): Promise<TechstackResponse>
  updateTechstack(id: number, input: unknown): Promise<TechstackResponse>
  getAll(): Promise<GetTechstackResponse>
  deleteTechstack(id: number): Promise<DeleteTechstackResponse>
}