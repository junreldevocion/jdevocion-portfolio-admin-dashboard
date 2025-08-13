import { ApiResponse } from '../services/Axios.service';

export interface CustomApiResponse<F, D, E> extends ApiResponse<D> {
  fields?: F
  errors?: E
}
