
import { GenerateConnectionMongoImpl } from "../../../../../app/shared/application/service/connection-mongo"
import { Product } from "../../../../../app/product/domain/data/entity/product"
import { ProductDataAccessBuilder } from "../../../../../app/product/infrastructure/service/data-access/product-data-acces-builder"
import { ProductControllerImpl } from "../../../../../app/product/presentation/controller/product-controller"
import { DataResponse } from "../../../../../app/shared/application/data/data-response"
import { InternalError } from "../../../../../app/shared/application/data/http-data-response-builder"

describe('Testes do ProductControllerImpl', () => {
  it('deve criar um produto', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProductDataResponse = {
      id: '631380461b68aafd51f2ad5e',
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as Product

    const dataResponse = {
      success: true,
      data: doubleProductDataResponse,
      errors: []
    } as DataResponse<Product>

    const doubleProductData = {
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as unknown as Product

    productDataAccess.create = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.create(doubleProductData)
    
    //Assert
    expect(responseData.statusCode).toBe(201)
    expect(responseData.body.success).toBe(true)
    expect(responseData.body.data).toStrictEqual(doubleProductDataResponse)
    expect(responseData.body.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar criar um produto e retornar um erro personalizado', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const dataResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: "Erro ao acessar banco de dados"
        }
      ]
    } as DataResponse<Product>

    const doubleProductData = {
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as unknown as Product

    productDataAccess.create = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.create(doubleProductData)
    
    //Assert
    expect(responseData.statusCode).toBe(400)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toBe(null)
    expect(responseData.body.errors).toStrictEqual([
      {
        message: "Erro ao acessar banco de dados"
      }
    ])
  })

  it('deve falhar ao tentar criar um produto e retornar um erro padrão', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const dataResponse = {
      success: false,
      data: null,
      errors: []
    } as DataResponse<Product>

    const doubleProductData = {
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as unknown as Product

    productDataAccess.create = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.create(doubleProductData)
    
    //Assert
    expect(responseData.statusCode).toBe(500)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toBe(null)
    expect(responseData.body.errors).toStrictEqual([InternalError])
  })

  it('deve retornar todos os produtos', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const dataResponse = {
      success: true,
      data: [
        {
          id: '631380461b68aafd51f2ad5e',
          name: 'Televisão',
          description: 'Tv LED',
          price: 1899.99
        } as Product,
        {
          id: '777780461b68aafd51f2ad5e',
          name: 'Mesa',
          description: 'mesa com 6 cadeiras marfim',
          price: 1666.99
        } as Product
      ],
      errors: []
    } as DataResponse<Product[]>

    productDataAccess.get = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.get()
    
    //Assert
    expect(responseData.statusCode).toBe(200)
    expect(responseData.body.success).toBe(true)
    expect(responseData.body.data).toStrictEqual(dataResponse.data)
    expect(responseData.body.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar listar todos os produtos e retornar um erro personalizado', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const dataResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: "Erro ao tentar conectar ao banco de dados"
        }
      ]
    } as DataResponse<Product[]>

    productDataAccess.get = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.get()
    
    //Assert
    expect(responseData.statusCode).toBe(400)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toStrictEqual(null)
    expect(responseData.body.errors).toStrictEqual([
      {
        message: "Erro ao tentar conectar ao banco de dados"
      }
    ])
  })

  it('deve falhar ao tentar listar todos os produtos e retornar um erro padrão', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const dataResponse = {
      success: false,
      data: null,
      errors: []
    } as DataResponse<Product[]>

    productDataAccess.get = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.get()
    
    //Assert
    expect(responseData.statusCode).toBe(500)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toBe(null)
    expect(responseData.body.errors).toStrictEqual([InternalError])
  })

  it('deve atualizar um produto', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProduct = {
      id: '631380461b68aafd51f2ad5e',
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as Product

    const dataResponse = {
      success: true,
      data: doubleProduct,
      errors: []
    } as DataResponse<Product>

    productDataAccess.update = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.update(doubleProduct)
    
    //Assert
    expect(responseData.statusCode).toBe(200)
    expect(responseData.body.success).toBe(true)
    expect(responseData.body.data).toStrictEqual(doubleProduct)
    expect(responseData.body.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar atualizar um produto e retornar um erro personalizado', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProduct = {
      id: '631380461b68aafd51f2ad5e',
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as Product

    const dataResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: "Erro indeterminado."
        }
      ]
    } as DataResponse<Product>

    productDataAccess.update = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.update(doubleProduct)
    
    //Assert
    expect(responseData.statusCode).toBe(400)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toStrictEqual(null)
    expect(responseData.body.errors).toStrictEqual(
      [
        {
          message: "Erro indeterminado."
        }
      ]
    )
  })

  it('deve falhar ao tentar atualizar um produto devido a um erro interno', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProduct = {
      id: '631380461b68aafd51f2ad5e',
      name: 'Televisão',
      description: 'Tv LED',
      price: 1899.99
    } as Product

    const dataResponse = {
      success: false,
      data: null,
      errors: []
    } as DataResponse<Product>

    productDataAccess.update = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.update(doubleProduct)
    
    //Assert
    expect(responseData.statusCode).toBe(500)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toStrictEqual(null)
    expect(responseData.body.errors).toStrictEqual(
      [
        {
          message: "Erro interno."
        }
      ]
    )
  })

  it('deve deletar um produto pelo ID', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProductId = "631380461b68aafd51f2ad5e"

    const dataResponse = {
      success: false,
      data: "Registro deletado com sucesso.",
      errors: []
    } as DataResponse<string>

    productDataAccess.delete = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.delete(doubleProductId)
    
    //Assert
    expect(responseData.statusCode).toBe(200)
    expect(responseData.body.success).toBe(true)
    expect(responseData.body.data).toStrictEqual(dataResponse.data)
    expect(responseData.body.errors).toStrictEqual([])
  })

  it('deve falhar ao tentar deletar um produto pelo id, pois ele é incorreto', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProductId = "631380461b68aafd51f2ad5e"

    const dataResponse = {
      success: false,
      data: null,
      errors: [
        {
          message: "Nenhum registro alterado."
        }
      ]
    } as DataResponse<string>

    productDataAccess.delete = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.delete(doubleProductId)
    
    //Assert
    expect(responseData.statusCode).toBe(400)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toStrictEqual(null)
    expect(responseData.body.errors).toStrictEqual(
      [
        {
          message: "Nenhum registro alterado."
        }
      ]
    )
  })

  it('deve falhar ao tentar deletar um produto pelo id devido a um erro interno', async () => {
    //Arrange
    const serviceMongo = GenerateConnectionMongoImpl.getMockInstance()
    const productDataAccess = await new ProductDataAccessBuilder(serviceMongo).build()
    const productController = new ProductControllerImpl(productDataAccess)

    const doubleProductId = "631380461b68aafd51f2ad5e"

    const dataResponse = {
      success: false,
      data: null,
      errors: []
    } as DataResponse<string>

    productDataAccess.delete = jest.fn().mockReturnValue(dataResponse)

    //Act 
    const responseData = await productController.delete(doubleProductId)
    
    //Assert
    expect(responseData.statusCode).toBe(500)
    expect(responseData.body.success).toBe(false)
    expect(responseData.body.data).toStrictEqual(null)
    expect(responseData.body.errors).toStrictEqual(
      [
        {
          message: "Erro interno."
        }
      ]
    )
  })
})