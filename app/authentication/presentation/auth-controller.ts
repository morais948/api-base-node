import { HttpDataResponse } from "../../shared/application/data/http-data-response"
import { HttpDataResponseBuilder } from "../../shared/application/data/http-data-response-builder"
import { AuthService } from "../application/service/auth-service"

export interface AuthController {
  login(email: string, password: string): Promise<HttpDataResponse<string>>
}

export class AuthControllerImpl {

  private _authService: AuthService

  constructor(authService: AuthService) {
    this._authService = authService
  }

  async login(email: string, password: string): Promise<HttpDataResponse<string>> {
    const userData = await this._authService.login(email, password)

    if (userData.errors.length > 0 && !userData.success) {
      return new HttpDataResponseBuilder<string>()
        .create()
        .withInfoErrorMessage(userData.errors)
        .build()
    }

    if (userData.data) {
      return new HttpDataResponseBuilder<string>()
        .create()
        .withOkMessage(userData.data)
        .build()
    }

    return new HttpDataResponseBuilder<string>()
      .create()
      .withInternalErrorMessage()
      .build()
  }
}