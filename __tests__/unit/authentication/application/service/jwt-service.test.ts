import { TokenPayload } from "../../../../../app/authentication/application/data/object-value/token-payload"
import { JWTServiceImpl } from "../../../../../app/authentication/application/service/jwt-service"

describe('Testes do serviço jwt', () => {
  it('deve criar um token a partir de um payload válido', () => {
    //Arrange
    const service = new JWTServiceImpl()
    const doublePayload = {
      user: {
        id: '89724uhjwensfkaes',
        name: 'Nome teste',
        email: 'teste@gmail.com'
      }
    } as TokenPayload

    //Act
    const token = service.createToken(doublePayload)

    //Assert
    expect(typeof token).toBe('string')
  })

  it('deve verificar com sucesso se um token é válido e retornar seu payload', () => {
    //Arrange
    const service = new JWTServiceImpl()
    const doublePayload = {
      user: {
        id: '89724uhjwensfkaes',
        name: 'Nome teste',
        email: 'teste@gmail.com'
      }
    } as TokenPayload
    const doubleToken = service.createToken(doublePayload)

    //Act
    const payload = service.getTokenPayloadValue(doubleToken)

    //Assert
    expect(payload!.user.id).toBe(doublePayload.user.id)
    expect(payload!.user.name).toBe(doublePayload.user.name)
    expect(payload!.user.email).toBe(doublePayload.user.email)
  })

  it('não deve retornar o payload pois o token é inválido', () => {
    //Arrange
    const service = new JWTServiceImpl()
    const doubleToken = `
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
      eyJ1c2VyIjp7ImlkIjoiODk3MjR1aGp3ZW5zZmthZXMiLCJuYW1lI
      joiTm9tZSB0ZXN0ZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY
      29tIn0sImlhdCI6MTY2MjU3ODgwMiwiZXhwIjoxNjYyNTc4ODIyfQ.
      rtcm_ZnCN_ZdXoNjM-cLIWyfr5xA38-XyVV8YKqZjCU
    `

    //Act
    const payload = service.getTokenPayloadValue(doubleToken)

    //Assert
    expect(payload).toBe(null)
  })
})