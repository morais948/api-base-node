import { HttpDataResponse } from "../../application/data/http-data-response";
import { ProductDataAccess } from "../../infrastructure/service/data-access/product-data-access";
import { ProductDTO } from "../../domain/data/entity/product";

export interface ProductController{
    create(productDto: ProductDTO): Promise<HttpDataResponse<ProductDTO>>

    get(): Promise<HttpDataResponse<ProductDTO[]>>
}

export class ProductControllerImpl{

    private productDataAccess: ProductDataAccess

    constructor(productDataAccess: ProductDataAccess){
        this.productDataAccess = productDataAccess
    }

    async create(productDto: ProductDTO): Promise<HttpDataResponse<ProductDTO>>{
        const responseData =  await this.productDataAccess.create(productDto)

        if(responseData instanceof Error){
            return {
                status: 400,
                data: null,
                errors: [
                    {
                        message: "Falha na tentativa de criar produto"
                    }
                ]
            } as HttpDataResponse<ProductDTO>
        }

        return {
            status: 201,
            data: responseData,
            errors: []
        } as HttpDataResponse<ProductDTO>
    }

    async get(): Promise<HttpDataResponse<ProductDTO[]>> {
        const responseData =  await this.productDataAccess.get()

        if(responseData instanceof Error){
            return {
                status: 400,
                data: null,
                errors: [
                    {
                        message: "Falha na tentativa de buscar produtos"
                    }
                ]
            } as HttpDataResponse<ProductDTO[]>
        }

        return {
            status: 200,
            data: responseData,
            errors: []
        } as HttpDataResponse<ProductDTO[]>
    }
}