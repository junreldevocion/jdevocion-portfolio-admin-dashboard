'use server';

import { revalidatePath } from 'next/cache';
import { techstackInstance } from '@/src/lib/services/Techstack.service';
import { TechstackServerResponse } from './types';
import { DeleteTechstackResponse, GetTechstackResponse } from '@/src/lib/interfaces/Techstack.interface';

export async function handleStackFormSave(initialState: TechstackServerResponse, formData: FormData): Promise<TechstackServerResponse> {
  const data = {
    name: formData.get('name') as string,
  };
  const result = await techstackInstance.createTechstack(data);

  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }

  return result;

}

export async function getTechStacks(): Promise<GetTechstackResponse> {
  const result = techstackInstance.getAll();
  return result;
}

export async function deleteTechstack(id: number): Promise<DeleteTechstackResponse> {
  const result = await techstackInstance.deleteTechstack(id);
  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }
  return result;
}

export async function handleStackFormUpdate(initialState: TechstackServerResponse, formData: FormData): Promise<TechstackServerResponse> {

  const data = {
    name: formData.get('name') as string,
    id: +(formData.get('id') as unknown as number),
  };

  const result = await techstackInstance.updateTechstack(data.id, { name: data.name });

  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }
  return result;
}