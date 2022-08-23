import { Schema } from "mongoose"
import generateConnection from "../../service/connection-mongo"

const generateModelProduct = async () => {
    const conn = await generateConnection()
    const ProductModel = conn.model('Product', new Schema({
        name: String,
        price: Number,
        description: String
    }))

    return ProductModel
}

export default generateModelProduct