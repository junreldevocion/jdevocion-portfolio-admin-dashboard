import { AxiosServices } from '@/src/lib/services/Axios.service';
import { IAuth, SignInResponse } from './Auth.interface';
import { AuthModel } from './Auth.model';
import { Routes } from '../constants/routes';
import { SignInputs } from './Auth.schema';

class AuthService extends AxiosServices implements IAuth {

  private authModel = AuthModel;

  async signIn(input: unknown): Promise<SignInResponse> {
    const validate = this.authModel.validate(input);
    if (!validate.success) {
      return {
        errors: this.authModel.formatError(validate.error),
        fields: input as Pick<SignInputs, 'username' | 'password'>,
        hasError: true,
      };
    }

    const response = await this.post<{ access_token: string }>(Routes.AUTH_LOGIN, validate.data);

    return {
      data: { accessToken: response.data?.access_token || '' },
      hasError: response.hasError,
      fields: validate.data,
      message: response.message
    };
  }
}

export const AuthServiceInstance: IAuth = new AuthService();