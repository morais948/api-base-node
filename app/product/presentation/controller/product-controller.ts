
import { ProductDataAccess } from "../../infrastructure/service/data-access/product-data-access";
import { Product } from "../../domain/data/entity/product";
import { HttpDataResponse } from "../../../shared/application/data/http-data-response";
import { HttpDataResponseBuilder } from "../../../shared/application/data/http-data-response-builder";


export interface ProductController {
  create(product: Product): Promise<HttpDataResponse<Product>>

  update(product: Product): Promise<HttpDataResponse<Product>>

  delete(productId: string): Promise<HttpDataResponse<string>>

  get(): Promise<HttpDataResponse<Product[]>>
}

export class ProductControllerImpl {

  private productDataAccess: ProductDataAccess

  constructor(productDataAccess: ProductDataAccess) {
    this.productDataAccess = productDataAccess
  }

  async create(product: Product): Promise<HttpDataResponse<Product>> {
    const responseData = await this.productDataAccess.create(product)

    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<Product>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<Product>()
        .create()
        .withCreatedMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<Product>()
      .create()
      .withInternalErrorMessage()
      .build()
  }

  async update(product: Product): Promise<HttpDataResponse<Product>> {
    const responseData = await this.productDataAccess.update(product)

    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<Product>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<Product>()
        .create()
        .withOkMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<Product>()
      .create()
      .withInternalErrorMessage()
      .build()
  }

  async get(): Promise<HttpDataResponse<Product[]>> {
    const responseData = await this.productDataAccess.get()

    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<Product[]>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<Product[]>()
        .create()
        .withOkMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<Product[]>()
      .create()
      .withInternalErrorMessage()
      .build()
  }

  async delete(productId: string): Promise<HttpDataResponse<string>> {
    const responseData = await this.productDataAccess.delete(productId)
    
    if (responseData.errors.length > 0 && !responseData.success) {
      return new HttpDataResponseBuilder<string>()
        .create()
        .withInfoErrorMessage(responseData.errors)
        .build()
    }

    if (responseData.data) {
      return new HttpDataResponseBuilder<string>()
        .create()
        .withOkMessage(responseData.data)
        .build()
    }

    return new HttpDataResponseBuilder<string>()
      .create()
      .withInternalErrorMessage()
      .build()
  }
}