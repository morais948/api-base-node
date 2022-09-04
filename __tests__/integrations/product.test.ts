import * as request from "supertest"
import { Product } from "../../app/domain/data/entity/product"
import app from "../../app/server"

describe('Testes do Product', () => {
  it('deve criar com sucesso um produto', async () => {
    //Arrange
    const doubleProductData = {
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as unknown as Product

    //Act
    const response = await request(app).post('/product/create').send(doubleProductData)

    //Assert
    expect(response.status).toBe(201)
  })

  it('deve retornar todos os produtos', async () => {
    //Arrange Act
    const response = await request(app).get('/product')

    //Assert
    expect(response.status).toBe(200)
  })
})