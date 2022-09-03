import { GenerateConnectionMongoImpl } from "./application/service/connection-mongo";
import { ProductDataAccessBuilder } from "./infrastructure/service/data-access/product-data-acces-builder";
import { ProductDataAccess } from "./infrastructure/service/data-access/product-data-access";
import { ProductController, ProductControllerImpl } from "./presentation/controller/product-controller";

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