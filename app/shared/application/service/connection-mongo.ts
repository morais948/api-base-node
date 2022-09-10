
import mongoose, { Connection } from "mongoose"
import { config } from "../data/config"

const user = config.mongo.user
const password = config.mongo.password

export interface GenerateConnectionMongo {
  createConnection(): Promise<Connection>
}

export class GenerateConnectionMongoImpl implements GenerateConnectionMongo {
  createConnection(): Promise<Connection> {    
    return mongoose.createConnection(`mongodb+srv://${user}:${password}@cluster0.vspi6.mongodb.net/?retryWrites=true&w=majority`).asPromise()
  }

  static getMockInstance(): GenerateConnectionMongo {
    const instance = {} as any

    instance.createConnection = jest
      .fn()
      .mockImplementation(() => Promise.resolve({}))

    return instance
  }
}
