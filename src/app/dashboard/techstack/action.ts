'use server';

import { revalidatePath } from 'next/cache';
import { TechstackService } from '@/src/lib/techstack/Techstack.service';
import { DeleteTechstackResponse, TechstackResponse } from '@/src/lib/techstack/Techstack.interface';
import { ServerCookieManager } from '@/src/lib/cookie/Server.Cookie';

export async function handleStackFormSave(initialState: TechstackResponse, formData: FormData): Promise<TechstackResponse> {
  const data = {
    name: formData.get('name') as string,
  };
  const accessToken = await new ServerCookieManager().getAccessToken();

  const result = await new TechstackService(accessToken).createTechstack(data);

  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }

  return result;

}

export async function deleteTechstack(id: number): Promise<DeleteTechstackResponse> {
  const accessToken = await new ServerCookieManager().getAccessToken();

  const result = await new TechstackService(accessToken).deleteTechstack(id);

  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }
  return result;
}

export async function handleStackFormUpdate(initialState: TechstackResponse, formData: FormData): Promise<TechstackResponse> {

  const data = {
    name: formData.get('name') as string,
    id: +(formData.get('id') as unknown as number),
  };

  const accessToken = await new ServerCookieManager().getAccessToken();

  const result = await new TechstackService(accessToken).updateTechstack(data.id, { name: data.name });

  if (!result.hasError) {
    revalidatePath('/dashboard/techstack');
  }
  return result;
}