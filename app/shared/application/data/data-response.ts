import { ErrorDataResponse } from "./error-data-response"

export type DataResponse<T> = {
  success: boolean
  data: T | null
  errors: ErrorDataResponse[]
}
