export type StackFormState = {
  name: string;
  errors?: {
    name?: string[];
  };
  success?: boolean;
  message?: string;
  hasError?: boolean;
  errorMessage?: string;
}

export type GetTechStacks = {
  techStacks?: TechStackTypeProps[];
  hasError?: boolean;
  errorMessage?: string;
}

type UserProps = {
  id: number,
  firstname: string,
  lastname: string,
  username: string,
  role: string
}

export type ErrorResponse = {
  error: boolean;
  message: string;
}

export type TechStackTypeProps = {
  id: number;
  name: string;
  createdAt: string;
  createdBy: UserProps;
}
