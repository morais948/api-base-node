import { ProductDTO} from '../../../domain/data/entity/product'
import { ProductModelService } from "../product-model-service"

export interface ProductDataAccess {
    create(productDto: ProductDTO): Promise<ProductDTO | Error>

    get(): Promise<ProductDTO[] | Error>
}

export class ProductDataAccessImpl implements ProductDataAccess{

    private readonly _productModelService: ProductModelService

    constructor(productModelService: ProductModelService){
        this._productModelService = productModelService
    }

    async create(productDto: ProductDTO): Promise<ProductDTO | Error>{
        try {
            const product = this._productModelService.generateModel()
            product.name = productDto.name
            product.price = productDto.price
            product.description = productDto.description
            const productData = await product.save()
    
            const productFormated = {
                id: productData._id,
                name: productData.name,
                price: productData.price,
                description: productData.description
            } as ProductDTO

            return productFormated
        } catch (error) {
            return new Error('Erro inesperado.')
        }
    }

    async get(): Promise<ProductDTO[] | Error>{
        //metodo com erro, ajustar depois
        try {
            const product = this._productModelService.generateModel()
            const productData = await product.get()

            console.log(productData)

            return new Error('Erro inesperado.')
        } catch (error) {
            console.log(error)
            return new Error('Erro inesperado.')
        }
    }
}