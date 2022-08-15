import { DataResponse } from "../../application/data/data-response";
import { ProductDataAccess } from "../../application/service/data-access";
import { ProductDTO } from "../../domain/data/entity/product";

export interface ProductController{
    //melhorar tipagem de retorno
    create(productDto: ProductDTO): Promise<DataResponse>
}

export class ProductControllerImpl{

    private productDataAccess: ProductDataAccess

    constructor(productDataAccess: ProductDataAccess){
        this.productDataAccess = productDataAccess
    }

    async create(productDto: ProductDTO): Promise<DataResponse>{
        return await this.productDataAccess.create(productDto)
    }
}