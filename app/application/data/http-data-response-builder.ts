import { DataResponse } from "./data-response"
import { ErrorDataResponse } from "./error-data-response"
import { HttpDataResponse } from "./http-data-response"

export const NotFoundError = {
  message: 'Não encontrado.'
} as ErrorDataResponse

export const NotAuthorizedError = {
  message: 'Acesso não autorizado.'
} as ErrorDataResponse

export const InternalError = {
  message: 'Erro interno.'
} as ErrorDataResponse

export class HttpDataResponseBuilder<T> {
  private _instance: HttpDataResponse<T> | null

  constructor() {
    this._instance = null
  }

  create(): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 0,
      body: {
        success: false,
        data: null,
        errors: []
      } as DataResponse<T>
    } as HttpDataResponse<T>

    return this
  }

  withOkMessage(data: T): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 200,
      body: {
        success: true,
        data: data,
        errors: []
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withCreatedMessage(data: T): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 201,
      body: {
        success: true,
        data: data,
        errors: []
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withUpdatedMessage(data: T): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 204,
      body: {
        success: true,
        data: data,
        errors: []
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withForbiddenErrorMessage(
    errors?: ErrorDataResponse[] | null
  ): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 403,
      body: {
        success: false,
        data: null,
        errors:
          errors ||
          ([
            {
              message: 'Acesso não permitido.'
            } as ErrorDataResponse
          ] as ErrorDataResponse[])
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withInternalErrorMessage(
    errors = [InternalError] as ErrorDataResponse[]
  ): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 500,
      body: {
        success: false,
        data: null,
        errors
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withNotFoundMessage(
    errors = [NotFoundError] as ErrorDataResponse[]
  ): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 404,
      body: {
        success: false,
        data: null,
        errors
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withUnauthorizedMessage(
    errors = [NotAuthorizedError] as ErrorDataResponse[]
  ): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 401,
      body: {
        success: false,
        data: null,
        errors
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  withInfoErrorMessage(errors: any): HttpDataResponseBuilder<T> {
    this._instance = {
      statusCode: 400,
      body: {
        success: false,
        data: null,
        errors
      } as DataResponse<T>
    } as HttpDataResponse<T>
    return this
  }

  build(): HttpDataResponse<T> {
    if (this._instance) {
      return this._instance
    }
    return this.create().build()
  }
}
