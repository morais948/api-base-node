import { DataResponse } from "../data/data-response"
import { ProductDTO} from '../../domain/data/entity/product'
import generateModelProduct from "../../infrastructure/data/models/Product"

export interface Product {
    create(productDto: ProductDTO): Promise<DataResponse>
}

export class ProductDataAccess{
    async create(productDto: ProductDTO): Promise<DataResponse>{
        try {
            const ProductModel = await generateModelProduct()
            const product = new ProductModel(productDto)
            const productData = await product.save()
    
            const response: DataResponse = {
                status: 200,
                data: {
                    id: productData._id,
                    name: productData.name,
                    price: productData.price,
                    description: productData.description
                },
                errors: []
            }

            return response
        } catch (error) {
            const response: DataResponse = {
                status: 400,
                data: null,
                errors: [
                    {
                        message: 'Erro inesperado.'
                    }
                ]
            }
            return response
        }
    }
}