
import { AxiosServices } from '@/src/lib/services/Axios.service';
import { Techstack } from './Techstack.model';
import { Routes } from '../constants/routes';
import { TechStackInput } from './techstack.schema';
import { DeleteTechstackResponse, ITechstack, TechstackResponse } from './Techstack.interface';

export class TechstackService extends AxiosServices implements ITechstack {

  readonly techStackModel = Techstack;

  constructor(accessToken?: string | null) {
    super(accessToken);
  }

  async createTechstack(inputs: unknown): Promise<TechstackResponse> {
    console.log(inputs, 'input');
    const validatedInputs = this.techStackModel.validate(inputs);

    if (!validatedInputs.success) {
      return {
        hasError: true,
        errors: this.techStackModel.formatError(validatedInputs.error),
        fields: validatedInputs.data
      };
    }

    const response = await this.post<TechStackInput>(Routes.TECHSTACK, validatedInputs.data);

    if (response.hasError) {
      return {
        fields: validatedInputs.data,
        hasError: true,
        message: response.message
      };
    }
    return response;
  }

  async updateTechstack(id: number, input: unknown): Promise<TechstackResponse> {
    const validatedInputs = this.techStackModel.validate(input);

    if (!validatedInputs.success) {
      return {
        hasError: true,
        errors: this.techStackModel.formatError(validatedInputs.error)
      };
    }

    const response = await this.patch<TechStackInput, unknown>(Routes.techstackDetails(id), validatedInputs.data);
    if (response.hasError) {
      return {
        fields: validatedInputs.data,
        hasError: true,
        message: response.message
      };
    }

    return response;
  }

  async getAll() {
    const response = await this.get<TechStackInput[]>(Routes.TECHSTACK);

    return {
      data: response.data,
      hasError: response.hasError
    };
  }

  async deleteTechstack(id: number): Promise<DeleteTechstackResponse> {
    const response = await this.delete(Routes.techstackDetails(id));

    return {
      data: response.data,
      hasError: response.hasError,
      message: response.message
    };
  }
}
