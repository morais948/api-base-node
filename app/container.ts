import { GenerateConnectionMongoImpl } from "./product/application/service/connection-mongo";
import { ProductDataAccessBuilder } from "./product/infrastructure/service/data-access/product-data-acces-builder";
import { ProductDataAccess } from "./product/infrastructure/service/data-access/product-data-access";
import { ProductController, ProductControllerImpl } from "./product/presentation/controller/product-controller";


export const createProductController = (productDataAccess: ProductDataAccess): ProductController => {
  return new ProductControllerImpl(productDataAccess)
}

export const container = () => {
  return {
    createProductController: async () => {
      const connecionMongo = await new GenerateConnectionMongoImpl()
      const productDataAccess = await new ProductDataAccessBuilder(connecionMongo).build()
      return createProductController(productDataAccess)
    }
  }
}