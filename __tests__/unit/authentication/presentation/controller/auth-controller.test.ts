import { AuthServiceImpl } from "../../../../../app/authentication/application/service/auth-service"
import { JWTServiceImpl } from "../../../../../app/authentication/application/service/jwt-service"
import { AuthDataAccessBuilder } from "../../../../../app/authentication/infrastructure/service/auth-data-access-builder"
import { AuthControllerImpl } from "../../../../../app/authentication/presentation/auth-controller"
import { DataResponse } from "../../../../../app/shared/application/data/data-response"
import { GenerateConnectionMongoImpl } from "../../../../../app/shared/application/service/connection-mongo"

describe('Testes do controlador de auth', () => {
  it('deve fazer login com sucesso', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)
    const authController = new AuthControllerImpl(authService)

    const doubleCredentials = {
      email: 'teste@gmail.com',
      password: '123456'
    } as any

    const dataResponse = {
      success: true,
      data: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJ1c2VyIjp7ImlkIjoiNjMxOGUxMzc3MGRiYW
            U5NjI3ZTgxZjBhIiwibmFtZSI6Ik1hdGhldXMg
            TW9yYWlzIiwiZW1haWwiOiJwcm9nbWF0aGV1c2
            1vcmFpc0BnbWFpbC5jb20ifSwiaWF0IjoxNjYyN
            zgxNDY2LCJleHAiOjE2NjMyMTM0NjZ9.6nwHfkl
            wG83LeC6avp2xtce5348i26Qo-0y_xxo6Yn0`,
      errors: []
    } as DataResponse<string>

    authService.login = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const response = await authController.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )
    
    //Assert
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toStrictEqual(dataResponse.data)
    expect(response.body.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar fazer login, pois o email ou senha é inválido', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)
    const authController = new AuthControllerImpl(authService)

    const doubleCredentials = {
      email: 'teste2@gmail.com',
      password: '123456'
    } as any

    const dataResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: 'email ou senha inválido.'
        }
      ]
    } as DataResponse<string>

    authService.login = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const response = await authController.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )
    
    //Assert
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.data).toBe(null)
    expect(response.body.errors).toStrictEqual([
      {
        message: 'email ou senha inválido.'
      }
    ])
  })

  it('deve falhar ao tentar fazer login devido a um erro interno', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)
    const authController = new AuthControllerImpl(authService)

    const doubleCredentials = {
      email: 'teste2@gmail.com',
      password: '123456'
    } as any

    const dataResponse = {
      success: false,
      data: null,
      errors: []
    } as DataResponse<string>

    authService.login = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const response = await authController.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )
    
    //Assert
    expect(response.statusCode).toBe(500)
    expect(response.body.success).toBe(false)
    expect(response.body.data).toBe(null)
    expect(response.body.errors).toStrictEqual([
      {
        message: 'Erro interno.'
      }
    ])
  })
})