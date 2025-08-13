'use server';

import { ProjectService } from '@/src/lib/project/Project.service';
import { ServerCookieManager } from '@/src/lib/cookie/Server.Cookie';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/src/lib/constants/routes';
import { ProjectResponse, ProjectUpdateResponse } from '@/src/lib/project/types';

export async function addProject(initValues: ProjectResponse, formdata: FormData): Promise<ProjectResponse> {

  const accessToken = await new ServerCookieManager().getAccessToken();
  const result = await new ProjectService(accessToken).createProject(formdata);

  if (!result.hasError) {
    revalidatePath('/dashboard/project');
  }
  return result;
}

export async function updateProject(initValues: ProjectUpdateResponse, formdata: FormData): Promise<ProjectUpdateResponse> {

  const id = formdata.get('id') as unknown as number;
  const accessToken = await new ServerCookieManager().getAccessToken();
  const result = await new ProjectService(accessToken).updateProject(id, formdata);
  return result;
}

export async function removeProject(id: number): Promise<ProjectResponse> {

  const accessToken = await new ServerCookieManager().getAccessToken();
  const result = await new ProjectService(accessToken).removeProject(id);
  if (!result.hasError) {
    revalidatePath(Routes.PROJECT);
  }

  return result;
}