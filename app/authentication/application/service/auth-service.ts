import * as bcrypt from 'bcrypt'
import { DataResponse } from '../../../shared/application/data/data-response'
import { AuthDataAccess } from '../../infrastructure/service/auth-data-access'
import { JWTService } from './jwt-service'

export interface AuthService{

  login(email: string, password: string): Promise<DataResponse<string>>

  comparePassword(
    currentPassword: string,
    expectedPasswordHash: string
  ): Promise<boolean>
}

export class AuthServiceImpl{

  private authDataAccess: AuthDataAccess
  private jwtService: JWTService

  constructor(authDataAccess: AuthDataAccess, jwtService: JWTService) {
    this.authDataAccess = authDataAccess
    this.jwtService = jwtService
  }

  async login(email: string, password: string): Promise<DataResponse<string>> {
    const userData = await this.authDataAccess.getUserByEmail(email)

    if(!userData.data){
      return {
        success: false,
        data: null,
        errors: [
          {
            message: 'email ou senha inválido.'
          }
        ]
      }
    }

    const isValid = await this.comparePassword(password, userData.data.hashPassword)

    if(isValid){
      const token = this.jwtService.createToken({
        user: {
          id: userData.data.id,
          name: userData.data.name,
          email: userData.data.email
        }
      })

      return {
        success: true,
        data: token,
        errors: []
      }
    }

    return {
      success: false,
      data: null,
      errors: [
        {
          message: 'email ou senha inválido.'
        }
      ]
    }
  }

  comparePassword(
    currentPassword: string,
    expectedPasswordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(currentPassword, expectedPasswordHash)
  }
}