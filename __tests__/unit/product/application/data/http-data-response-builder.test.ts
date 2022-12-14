
import { Product } from "../../../../../app/product/domain/data/entity/product"
import { HttpDataResponseBuilder } from "../../../../../app/shared/application/data/http-data-response-builder"

describe('Testes do HttpDataResponseBuilder', () => {
  it('deve retornar um objeto HttpDataResponseBuilder de "Acesso não permitido"', () => {
    //Arrange
    const doubleHttpDataResponse = new HttpDataResponseBuilder()

    //Act
    const response = doubleHttpDataResponse
      .withForbiddenErrorMessage()
      .build()

    //Assert
    expect(response.statusCode).toBe(403)
    expect(response.body.data).toBe(null)
    expect(response.body.errors).toStrictEqual([
      {
        message: 'Acesso não permitido.'
      }
    ])
  })

  it('deve retornar um objeto HttpDataResponseBuilder de "Não encontrado."', () => {
    //Arrange
    const doubleHttpDataResponse = new HttpDataResponseBuilder()

    //Act
    const response = doubleHttpDataResponse
      .withNotFoundMessage()
      .build()

    //Assert
    expect(response.statusCode).toBe(404)
    expect(response.body.data).toBe(null)
    expect(response.body.errors).toStrictEqual([
      {
        message: 'Não encontrado.'
      }
    ])
  })

  it('deve retornar um objeto HttpDataResponseBuilder de "Acesso não autorizado."', () => {
    //Arrange
    const doubleHttpDataResponse = new HttpDataResponseBuilder()

    //Act
    const response = doubleHttpDataResponse
      .withUnauthorizedMessage()
      .build()

    //Assert
    expect(response.statusCode).toBe(401)
    expect(response.body.data).toBe(null)
    expect(response.body.errors).toStrictEqual([
      {
        message: 'Acesso não autorizado.'
      }
    ])
  })

  it('deve criar uma instancia do builder quando ela for nula', () => {
    //Arrange
    const doubleHttpDataResponse = new HttpDataResponseBuilder().build()

    //Act Assert
    expect(doubleHttpDataResponse).toStrictEqual({
      statusCode: 0, 
      body: { success: false, data: null, errors: [] }
    })
  })
})