import { AxiosServices } from '@/src/lib/services/Axios.service';
import { IAuth, SignInResponse } from '../interfaces/Auth.interface';
import { AuthModel } from '../model/Auth.model';
import { Routes } from '../constants/routes';

class AuthService extends AxiosServices implements IAuth {

  private authModel = AuthModel;

  async signIn(input: unknown): Promise<SignInResponse> {
    const validate = this.authModel.validate(input);
    if (!validate.success) {
      return {
        errors: this.authModel.formatError(validate.error),
        fields: validate.data,
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