import { AuthServiceImpl } from "../../../../../app/authentication/application/service/auth-service"
import { JWTServiceImpl } from "../../../../../app/authentication/application/service/jwt-service"
import { AuthDataAccessBuilder } from "../../../../../app/authentication/infrastructure/service/auth-data-access-builder"
import { GenerateConnectionMongoImpl } from "../../../../../app/shared/application/service/connection-mongo"

describe('Testes do serviço de autenticação', () => {
  it('deve realizar o login', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)

    const doubleUser = {
      success: true,
      data: {
        id: 'id to test',
        name: 'test',
        email: 'email test',
        hashPassword: '666'
      },
      errors: []
    }

    const doubleCredentials = {
      email: 'teste@gmail.com',
      password: '123456'
    } as any

    authDataAccess.getUserByEmail = jest
      .fn()
      .mockReturnValue(Promise.resolve(doubleUser))

    authService.comparePassword = jest.fn().mockReturnValue(true)
    
    //Act
    const response = await authService.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )

    //Assert
    expect(typeof response.data).toBe('string')
    expect(response.success).toBe(true)
    expect(response.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar realizar o login devido a um usuário não encontrado', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)

    const doubleUser = {
      success: false,
      data: null,
      errors: []
    }

    const doubleCredentials = {
      email: 'teste@gmail.com',
      password: '123456'
    } as any

    const doubleResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: 'email ou senha inválido.'
        }
      ]
    }

    authDataAccess.getUserByEmail = jest
      .fn()
      .mockReturnValue(Promise.resolve(doubleUser))

    authService.comparePassword = jest.fn().mockReturnValue(true)
    
    //Act
    const response = await authService.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )

    //Assert
    expect(response.success).toBe(false)
    expect(response.data).toBe(null)
    expect(response.errors).toStrictEqual(doubleResponse.errors)
  })

  it('deve falhar ao tentar realizar o login devido a uma senha incorreta', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)

    const doubleUser = {
      success: true,
      data: {
        id: 'id to test',
        name: 'test',
        email: 'email test',
        hashPassword: '666'
      },
      errors: []
    }

    const doubleCredentials = {
      email: 'teste@gmail.com',
      password: '123456'
    } as any

    const doubleResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: 'email ou senha inválido.'
        }
      ]
    }

    authDataAccess.getUserByEmail = jest
      .fn()
      .mockReturnValue(Promise.resolve(doubleUser))

    authService.comparePassword = jest.fn().mockReturnValue(false)
    
    //Act
    const response = await authService.login(
      doubleCredentials.email, 
      doubleCredentials.password
    )

    //Assert
    expect(response.success).toBe(false)
    expect(response.data).toBe(null)
    expect(response.errors).toStrictEqual(doubleResponse.errors)
  })

  it('deve comparar uma senha e um hash, e retornar "true" pois a senha está correta', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)

    const doublePassword = "123456"
    const doubleHash = "$2b$10$qGFUD.w211MsMieNEDv8/OJ/VPeHHfzas3gIRQfM6yk4XFBiKtqh2"
    
    //Act
    const response = await authService.comparePassword(
      doublePassword,
      doubleHash
    )

    //Assert
    expect(response).toBe(true)
  })

  it('deve comparar uma senha e um hash, e retornar "false" pois a senha esta incorreta', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const authDataAccess = await new AuthDataAccessBuilder(serviceMongo).build()
    const jwtService = new JWTServiceImpl()
    const authService = new AuthServiceImpl(authDataAccess, jwtService)

    const doublePassword = "12345678"
    const doubleHash = "$2b$10$qGFUD.w211MsMieNEDv8/OJ/VPeHHfzas3gIRQfM6yk4XFBiKtqh2"
    
    //Act
    const response = await authService.comparePassword(
      doublePassword,
      doubleHash
    )

    //Assert
    expect(response).toBe(false)
  })
})