export class Routes {
  static readonly HOME = '/';
  static readonly PROJECT = '/project';
  static projectDetail(id: number | string) {
    return `/project/${id}`;
  }

  static readonly TECHSTACK = '/techstack';
  static techstackDetails(id: number | string) {
    return `/techstack/${id}`;
  }

  static readonly AUTH_LOGIN = '/auth/login';

}