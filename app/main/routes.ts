import * as express from 'express'

const Router: express.Router = express.Router()

import { ProductDataAccessImpl } from '../infrastructure/service/data-access/product-data-access';
import { ProductDTO } from '../domain/data/entity/product';
import { ProductControllerImpl } from '../presentation/controller/product-controller';
import { GenerateConnectionMongoImpl } from '../application/service/connection-mongo';

Router.post('/product/create', async (req: express.Request, res: express.Response) => {

    const {name, price, description} = req.body
    const productData = {
        name, 
        price, 
        description
    } as ProductDTO

    //desenvolver container de injeção de dependência
    const connecionMongo = await new GenerateConnectionMongoImpl().createConnection()
    const productDataAccess = new ProductDataAccessImpl(connecionMongo)
    const productController = new ProductControllerImpl(productDataAccess)
    const productResponse = await productController.create(productData)

    res.status(productResponse.statusCode).json(productResponse)
})

Router.get('/product/', async (req: express.Request, res: express.Response) => {

    //desenvolver container de injeção de dependência
    const connecionMongo = await new GenerateConnectionMongoImpl().createConnection()
    const productDataAccess = new ProductDataAccessImpl(connecionMongo)
    const productController = new ProductControllerImpl(productDataAccess)
    const productResponse = await productController.get()

    res.status(productResponse.statusCode).json(productResponse)
})

export default Router