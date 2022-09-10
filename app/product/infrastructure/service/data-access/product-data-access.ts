
import { Product } from '../../../domain/data/entity/product'
import { Connection } from 'mongoose'
import { ObjectId } from 'mongodb'
import { DataResponse } from '../../../../shared/application/data/data-response'

export interface ProductDataAccess {
  create(productDto: Product): Promise<DataResponse<Product>>

  update(productDto: Product): Promise<DataResponse<Product>>

  get(): Promise<DataResponse<Product[]>>
}

export class ProductDataAccessImpl implements ProductDataAccess {

  private readonly _connection: Connection

  constructor(connection: Connection) {
    this._connection = connection
  }

  async create(productDto: Product): Promise<DataResponse<Product>> {
    try {
      const dataResponse = await this._connection.db.collection('products').insertOne({
        name: productDto.name,
        price: productDto.price,
        description: productDto.description
      })

      return {
        success: true,
        data: {
          ...productDto,
          id: dataResponse.insertedId.toString()
        } as Product,
        errors: []
      } as DataResponse<Product>
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      } as DataResponse<Product>
    }
  }

  async get(): Promise<DataResponse<Product[]>> {
    try {
      const dataResponse = await this._connection.db.collection('products').find({}).toArray()

      return {
        success: true,
        data: dataResponse.map((el: any) => {
          return {
            id: el._id,
            name: el.name,
            price: el.price,
            description: el.description
          }
        }),
        errors: []
      } as DataResponse<Product[]>
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      } as DataResponse<Product[]>
    }
  }

  async update(productDto: Product): Promise<DataResponse<Product>> {
    try {
      const dataResponse = await this._connection.db.collection('products').updateOne(
        {
          _id: new ObjectId(productDto.id)
        },
        {
          $set: {
            name: productDto.name,
            price: productDto.price,
            description: productDto.description
          }
        }
      )

      if(dataResponse.modifiedCount > 0){
        return {
          success: true,
          data: productDto,
          errors: []
        }
      }

      return {
        success: false,
        data: null,
        errors: [
          {
            message: "Nenhum registro alterado."
          }
        ]
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      }
    }
  }
}