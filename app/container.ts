import { GenerateConnectionMongoImpl } from "./shared/application/service/connection-mongo";
import { ProductDataAccessBuilder } from "./product/infrastructure/service/data-access/product-data-acces-builder";
import { ProductDataAccess } from "./product/infrastructure/service/data-access/product-data-access";
import { ProductController, ProductControllerImpl } from "./product/presentation/controller/product-controller";
import { AuthDataAccess } from "./authentication/infrastructure/service/auth-data-access";
import { AuthController, AuthControllerImpl } from "./authentication/presentation/auth-controller";
import { AuthDataAccessBuilder } from "./authentication/infrastructure/service/auth-data-access-builder";
import { JWTServiceImpl } from "./authentication/application/service/jwt-service";
import { AuthServiceImpl } from "./authentication/application/service/auth-service";


export const createProductController = (productDataAccess: ProductDataAccess): ProductController => {
  return new ProductControllerImpl(productDataAccess)
}

export const createAuthController = (authDataAccess: AuthDataAccess): AuthController => {
  const jwtService = new JWTServiceImpl()
  const service = new AuthServiceImpl(authDataAccess, jwtService)
  return new AuthControllerImpl(service)
}

export const container = () => {
  return {
    createProductController: async () => {
      const connecionMongo = await new GenerateConnectionMongoImpl()
      const productDataAccess = await new ProductDataAccessBuilder(connecionMongo).build()
      return createProductController(productDataAccess)
    },
    createAuthController: async () => {
      const connecionMongo = await new GenerateConnectionMongoImpl()
      const productDataAccess = await new AuthDataAccessBuilder(connecionMongo).build()
      return createAuthController(productDataAccess)
    }
  }
}