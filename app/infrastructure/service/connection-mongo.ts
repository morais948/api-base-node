
import mongoose from "mongoose"
require('dotenv-safe').config()

const user = process.env.USER
const password = process.env.PASSWORD

const generateConnection = async () =>{
    const connection = await mongoose.createConnection(`mongodb+srv://${user}:${password}@cluster0.vspi6.mongodb.net/?retryWrites=true&w=majority`).asPromise()
    return connection
}

export default generateConnection