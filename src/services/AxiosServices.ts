import axios, { AxiosInstance } from 'axios';
import { Environment } from '../constants/Environtment';

interface ErrorResponse {
  error: boolean;
  message: string;
}

interface successResponse<T> {
  success: boolean;
  data: T;
}

export interface AxiosResponse<T> extends successResponse<T>, ErrorResponse { }

export class AxiosServices {
  private axiosInstance: AxiosInstance;

  constructor(accessToken: string | null) {
    this.axiosInstance = axios.create({
      baseURL: Environment.API_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      },
    });
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url);

      return {
        success: true,
        data: response.data,
        error: false,
        message: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: true,
          message: error.response?.data?.message || 'An error occurred while fetching data',
        } as AxiosResponse<T>;
      }
      throw error;
    }
  }

  async post<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return {
        success: true,
        data: response.data,
        error: false,
        message: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          message: error.response?.data?.message || 'An error occurred while posting data',
        } as AxiosResponse<T>;
      }
      throw error;
    }
  }

  async patch<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data);
      return {
        success: true,
        data: response.data,
        error: false,
        message: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          message: error.response?.data?.message || 'An error occurred while updating data',
        } as AxiosResponse<T>;
      }
      throw error;
    }
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url);
      return {
        success: true,
        data: response.data,
        error: false,
        message: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          message: error.response?.data?.message || 'An error occurred while deleting data',
        } as AxiosResponse<T>;
      }
      throw error;

    }

  }
}