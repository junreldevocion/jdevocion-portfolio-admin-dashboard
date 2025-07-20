export type LoginFormState = {
  success: boolean;
  message?: string;
  errors?: {
    username?: string[],
    password?: string[]
  },
  password: string;
  username: string;
  hasError?: boolean;
  errorMessage?: string;
}