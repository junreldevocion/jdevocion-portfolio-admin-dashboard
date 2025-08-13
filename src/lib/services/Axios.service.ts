/**
 * AxiosServices provides a wrapper around Axios for making HTTP requests with built-in error handling and token management.
 *
 * - Supports GET, POST, PATCH, DELETE methods.
 * - Handles access tokens via a cookie manager.
 * - Returns a consistent ApiResponse structure for all requests.
 */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Environment } from '../constants/Environtment';

export interface ApiResponse<T> {
  hasError: boolean;
  message?: string;
  statusCode?: number;
  data?: T
}

/**
 * Service class for making authenticated HTTP requests using Axios.
 * Use AxiosServices.create() to instantiate with an optional cookie manager for token handling.
 */
export class AxiosServices {
  private axiosInstance: AxiosInstance;

  /**
   * Private constructor. Use the static create() method to instantiate.
   * @param accessToken Optional access token for Authorization header.
   */
  constructor(accessToken?: string | null) {
    this.axiosInstance = axios.create({
      baseURL: Environment.API_URL,
      headers: {
        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
      },
    });
  }

  /**
   * Perform a GET request.
   * @param url The endpoint URL.
   */
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url);
      return this.handleSuccess(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleError(error);
      }
      throw error;
    }
  }

  /**
   * Perform a POST request.
   * @param url The endpoint URL.
   * @param data The request payload.
   */
  async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return this.handleSuccess(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleError(error);
      }
      throw error;
    }
  }

  /**
   * Perform a PATCH request.
   * @param url The endpoint URL.
   * @param data The request payload.
   */
  async patch<T, D>(url: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data);
      return this.handleSuccess(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleError(error);
      }
      throw error;
    }
  }

  /**
   * Perform a DELETE request.
   * @param url The endpoint URL.
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url);
      return this.handleSuccess<T>(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleError(error);
      }
      throw error;

    }
  }

  private handleSuccess<T>(data: T): ApiResponse<T> {
    return {
      data,
      hasError: false
    };
  }

  /**
   * Handles Axios errors and returns a standardized ApiResponse.
   * @param error The error thrown by Axios.
   */
  private handleError<T>(error: unknown): ApiResponse<T> {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      hasError: true,
      message: axiosError.response?.data?.message || 'Unknown error occured',
      statusCode: axiosError.response?.status || 500
    };
  }
}