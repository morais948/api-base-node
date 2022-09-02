import { HttpDataResponse } from "../../application/data/http-data-response";
import { ProductDataAccess } from "../../infrastructure/service/data-access/product-data-access";
import { ProductDTO } from "../../domain/data/entity/product";
import { DataResponse } from "../../application/data/data-response";
import { HttpDataResponseBuilder } from "../../application/data/http-data-response-builder";

export interface ProductController {
  create(productDto: ProductDTO): Promise<HttpDataResponse<ProductDTO>>

  get(): Promise<HttpDataResponse<ProductDTO[]>>
}

export class ProductControllerImpl {

  private productDataAccess: ProductDataAccess

  constructor(productDataAccess: ProductDataAccess) {
    this.productDataAccess = productDataAccess
  }

  async create(productDto: ProductDTO): Promise<HttpDataResponse<ProductDTO>> {
    const responseData = await this.productDataAccess.create(productDto)

    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<ProductDTO>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<ProductDTO>()
        .create()
        .withCreatedMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<ProductDTO>()
      .create()
      .withInternalErrorMessage()
      .build()
  }

  async get(): Promise<HttpDataResponse<ProductDTO[]>> {
    const responseData = await this.productDataAccess.get()

    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<ProductDTO[]>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<ProductDTO[]>()
        .create()
        .withOkMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<ProductDTO[]>()
      .create()
      .withInternalErrorMessage()
      .build()
  }
}