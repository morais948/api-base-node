
import mongoose, { Connection } from "mongoose"
require('dotenv-safe').config()

const user = process.env.USER
const password = process.env.PASSWORD

export interface GenerateConnectionMongo{
    createConnection(): Promise<Connection>
}

export class GenerateConnectionMongoImpl implements GenerateConnectionMongo{
    createConnection(): Promise<Connection> {
        return mongoose.createConnection(`mongodb+srv://${user}:${password}@cluster0.vspi6.mongodb.net/?retryWrites=true&w=majority`).asPromise()
    }
}
