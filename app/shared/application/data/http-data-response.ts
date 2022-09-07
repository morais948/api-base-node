import { DataResponse } from './data-response'

export type HttpDataResponse<T> = {
  statusCode: number
  body: DataResponse<T>
}
