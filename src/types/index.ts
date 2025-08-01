
export type CustomApiResponse<F, D> = {
  hasError: boolean
  fields?: F
  data?: D;
  errors?: F
  message?: string
}
