import { GenerateConnectionMongo } from "../../../shared/application/service/connection-mongo"
import { AuthDataAccess, AuthDataAccessImpl } from "./auth-data-access"


export class AuthDataAccessBuilder{
  private readonly _generateConnectionMongo: GenerateConnectionMongo
  private _instance: AuthDataAccess | null

  constructor(generateConnectionMongo: GenerateConnectionMongo){
    this._generateConnectionMongo = generateConnectionMongo
    this._instance = null
  }

  async create(): Promise<AuthDataAccessBuilder> {
    const connection = await this._generateConnectionMongo.createConnection()
    this._instance = new AuthDataAccessImpl(connection)
    return this
  }

  async build(): Promise<AuthDataAccess> {
    if(!this._instance){
      return await (await this.create()).build()
    }

    return this._instance
  }
}