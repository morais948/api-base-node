
import mongoose, { Connection } from "mongoose"
require('dotenv-safe').config()

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD

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
