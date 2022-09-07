import { GenerateConnectionMongo } from '../../../application/service/connection-mongo'
import { ProductDataAccess, ProductDataAccessImpl } from "./product-data-access";

export class ProductDataAccessBuilder{
  private readonly _generateConnectionMongo: GenerateConnectionMongo
  private _instance: ProductDataAccess | null

  constructor(generateConnectionMongo: GenerateConnectionMongo){
    this._generateConnectionMongo = generateConnectionMongo
    this._instance = null
  }

  async create(): Promise<ProductDataAccessBuilder> {
    const connection = await this._generateConnectionMongo.createConnection()
    this._instance = new ProductDataAccessImpl(connection)
    return this
  }

  async build(): Promise<ProductDataAccess> {
    if(!this._instance){
      return await (await this.create()).build()
    }

    return this._instance
  }
}