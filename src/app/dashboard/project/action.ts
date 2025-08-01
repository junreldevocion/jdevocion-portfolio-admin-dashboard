'use server';

import { ServerCookieManager } from '@/src/lib/ServerCookieManager';
import { AxiosServices } from '@/src/lib/services/Axios.service';
import { ProjectTypeProps } from './types';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { ApiResponse } from '@/src/types';

const ProjectFormSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  githubUrl: z.string().min(1, { message: 'GithubUrl is required' }),
  liveDemoUrl: z.string().min(1, { message: 'LiveDemoUrl is required' }),
  imageUrl: z.string().min(1, { message: 'ImageUrl is required' }),
  techStack: z.string().min(1, { message: 'TechStack is required' }),
});

export async function addProject(initValues: ApiResponse<ProjectTypeProps, ProjectTypeProps>, formdata: FormData): Promise<ApiResponse<ProjectTypeProps, ProjectTypeProps>> {

  const data = {
    title: formdata.get('title') as string,
    description: formdata.get('description') as string,
    githubUrl: formdata.get('githubUrl') as string,
    liveDemoUrl: formdata.get('liveDemoUrl') as string,
    imageUrl: formdata.get('imageUrl') as string,
    techStacks: []
  };

  const validatedFields = ProjectFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors as unknown as ProjectTypeProps,
      data,
      hasError: true,
    };
  }

  const cookieManager = new ServerCookieManager();
  const apiService = new AxiosServices(cookieManager);
  const response = await apiService.post('/project', data);

  if (response.hasError) {
    return {
      data,
      errorMessage: response.errorMessage,
      hasError: true
    };
  }

  return {
    hasError: false,
    data
  };
}

export async function updateProject(initValues: ApiResponse<ProjectTypeProps, ProjectTypeProps>, formdata: FormData): Promise<ApiResponse<ProjectTypeProps, ProjectTypeProps>> {
  const data = {
    title: formdata.get('title') as string,
    description: formdata.get('description') as string,
    githubUrl: formdata.get('githubUrl') as string,
    liveDemoUrl: formdata.get('liveDemoUrl') as string,
    imageUrl: formdata.get('imageUrl') as string,
    techStacks: []
  };

  const validatedFields = ProjectFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors as unknown as ProjectTypeProps,
      data,
      hasError: true,
    };
  }

  const cookieManager = new ServerCookieManager();
  const apiService = new AxiosServices(cookieManager);
  const response = await apiService.post('/project', data);

  if (response.hasError) {
    return {
      data,
      errorMessage: response.errorMessage,
      hasError: true
    };
  }

  return {
    hasError: false,
    data
  };
}

export async function getProjects(): Promise<{ success: boolean; projects: ProjectTypeProps[]; errorMessage?: string }> {
  const cookieManager = new ServerCookieManager();
  const apiService = new AxiosServices(cookieManager);
  const response = await apiService.get<ProjectTypeProps[]>('/project');

  if (response.hasError) {
    return {
      success: false,
      errorMessage: response.errorMessage,
      projects: [],
    };
  }
  return {
    success: true,
    projects: response.data ?? [],
  };
}

export async function removeProject(id: number): Promise<{ success: boolean; message?: string }> {
  const cookieManager = new ServerCookieManager();
  const apiService = new AxiosServices(cookieManager);
  const response = await apiService.delete<{ message: string }>(`/project/${id}`);

  if (response.hasError) {
    return {
      success: false,
      message: response.errorMessage,
    };
  }

  revalidatePath('/dashboard/project');

  return {
    success: true,
    message: 'Project removed successfully',
  };
}