import { DataResponse } from '../../../application/data/data-response'
import { ProductDTO } from '../../../domain/data/entity/product'
import { GenerateConnectionMongo } from '../../../application/service/connection-mongo'
import { Connection } from 'mongoose'

export interface ProductDataAccess {
  create(productDto: ProductDTO): Promise<DataResponse<ProductDTO>>

  get(): Promise<DataResponse<ProductDTO[]>>
}

export class ProductDataAccessImpl implements ProductDataAccess {

  private readonly _connection: Connection

  constructor(connection: Connection) {
    this._connection = connection
  }

  async create(productDto: ProductDTO): Promise<DataResponse<ProductDTO>> {
    try {
      const dataResponse = await this._connection.db.collection('products').insertOne({
        name: productDto.name,
        price: productDto.price,
        description: productDto.description
      })

      return {
        success: false,
        data: {
          ...productDto,
          id: dataResponse.insertedId.toString()
        } as ProductDTO,
        errors: []
      } as DataResponse<ProductDTO>
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      } as DataResponse<ProductDTO>
    }
  }

  async get(): Promise<DataResponse<ProductDTO[]>> {
    try {
      const dataResponse = await this._connection.db.collection('products').find({}).toArray()

      return {
        success: false,
        data: dataResponse.map((el: any) => {
          return {
            id: el._id,
            name: el.name,
            price: el.price,
            description: el.description
          }
        }),
        errors: []
      } as DataResponse<ProductDTO[]>
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      } as DataResponse<ProductDTO[]>
    }
  }
}