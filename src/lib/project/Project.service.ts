
import { IProject } from './Project.interface';
import { ProjectModel } from './Project.model';
import { AxiosServices } from '../services/Axios.service';
import { Routes } from '../constants/routes';
import { ProjectResponse, ProjectInputResponse, ProjectUpdateResponse, ProjectUpdateInputResponse, GetProjectResponse, ProjectValidatedInput } from './types';
import { ProjectInput } from './project.schema';

export class ProjectService extends AxiosServices implements IProject {
  readonly projectModel = ProjectModel;

  constructor(accessToken?: string | null) {
    super(accessToken);
  }

  async createProject(input: FormData): Promise<ProjectResponse> {
    const validateFields = this.projectModel.validate(input);
    if (!validateFields.success) {
      return {
        hasError: true,
        errors: this.projectModel.formatError<ProjectValidatedInput>(validateFields.error),
        fields: this.projectModel.formatInput(input)
      };
    }

    const response = await this.post<ProjectInputResponse>(Routes.PROJECT, input);
    return {
      ...response,
      fields: validateFields.data as ProjectInput,
    };
  }

  async updateProject(id: number, input: FormData): Promise<ProjectUpdateResponse> {
    const validateFields = this.projectModel.validate(input);
    console.log(validateFields, 'validateFields');
    if (!validateFields.success) {
      return {
        hasError: true,
        errors: this.projectModel.formatError(validateFields.error),
        fields: this.projectModel.formatInput(input)
      };
    }

    const response = await this.patch<ProjectUpdateInputResponse, unknown>(Routes.projectDetail(id), input);
    return {
      ...response,
      fields: validateFields.data,
    };
  }

  async getAll(): Promise<GetProjectResponse> {
    const response = await this.get<ProjectInputResponse[]>(Routes.PROJECT);
    return response;
  }

  async removeProject(id: number): Promise<ProjectResponse> {
    const response = await this.delete<{ message: string }>(Routes.projectDetail(id));

    return {
      hasError: response.hasError,
      message: response.data?.message as string || response.message
    };
  }

}