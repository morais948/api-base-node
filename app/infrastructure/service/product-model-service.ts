import { Connection, Document, Schema } from "mongoose"

export interface ProductModelService{
    generateModel(): any 
}

export class ProductModelServiceImpl{
    private readonly _connection: Connection

    constructor(connection: Connection){
        this._connection = connection
    }

    generateModel() {
        const ProductModel = this._connection.model('Product', new Schema({
            name: String,
            price: Number,
            description: String
        }))
        return new ProductModel()
    }
}
