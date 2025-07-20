'use server';

import z from 'zod';
import { GetTechStacks, StackFormState, TechStackTypeProps } from './types';
import { revalidatePath } from 'next/cache';
import { AxiosServices } from '@/src/services/AxiosServices';
import { ServerCookieManager } from '@/src/lib/ServerCookieManager';

const stackFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export async function handleStackFormSave(initialState: StackFormState, formData: FormData): Promise<StackFormState> {
  const data = {
    name: formData.get('name') as string,
  };

  const validatedFields = stackFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)?.fieldErrors as StackFormState['errors'],
      success: false,
      name: data.name,
    };
  }
  const accessToken = await ServerCookieManager.getAccessToken();

  const apiService = new AxiosServices(accessToken);
  const response = await apiService.post<TechStackTypeProps, { name: TechStackTypeProps['name'] }>('/techstack', data);

  if (response.error) {
    return {
      success: false,
      hasError: response.error,
      errorMessage: response.message,
      name: data.name as string,
    };
  }

  revalidatePath('/dashboard/techstack');

  return {
    success: true,
    message: 'Technology stack added successfully',
    name: data.name as string,
  };

}

export async function getTechStacks(): Promise<GetTechStacks> {
  const accessToken = await ServerCookieManager.getAccessToken();

  const apiService = new AxiosServices(accessToken);

  const response = await apiService.get<TechStackTypeProps[]>('/techstack');

  return {
    techStacks: response.data,
    hasError: response.error,
    errorMessage: response.message,
  };
}

export async function deleteTechStack({ id }: { id: number }): Promise<{ success: boolean; message?: string }> {

  const accessToken = await ServerCookieManager.getAccessToken();

  const apiUrl = `/techstack/${id}`;

  const apiService = new AxiosServices(accessToken);

  const response = await apiService.delete<{ message: string }>(apiUrl);

  if (response.error) {
    return {
      success: response.success,
      message: response.message,
    };
  }

  revalidatePath('/dashboard/techstack');

  return {
    success: response.success,
    message: 'Technology stack deleted successfully',
  };
}

export async function handleStackFormUpdate(initialState: StackFormState, formData: FormData): Promise<StackFormState> {

  const data = {
    name: formData.get('name') as string,
    id: formData.get('id'),
  };

  const validatedFields = stackFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)?.fieldErrors as StackFormState['errors'],
      success: false,
      name: data.name,
    };
  }

  const accessToken = await ServerCookieManager.getAccessToken();

  const apiService = new AxiosServices(accessToken);
  const id = data.id;
  const name = data.name;

  const response = await apiService.patch<TechStackTypeProps, { name: string }>(`/techstack/${id}`, { name });

  if (response.error) {
    return {
      success: false,
      hasError: response.error,
      errorMessage: response.message,
      name,
    };
  }

  revalidatePath('/dashboard/techstack');

  return {
    success: true,
    message: 'Technology stack updated successfully',
    name,
  };
}