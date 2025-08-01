import { Environment } from '@/src/lib/constants/Environtment';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const apiUrl = `${Environment.API_URL}/auth/login`;
    const response = await axios.post(apiUrl, { ...res });
    return Response.json({ ...response.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json({ ...error.response?.data });
    }
  }
}