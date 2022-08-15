import * as express from 'express'

const Router: express.Router = express.Router()

import { ProductDataAccess } from '../application/service/data-access';
import { ProductDTO } from '../domain/data/entity/product';
import { ProductControllerImpl } from '../presentation/controller/product-controller';

Router.post('/product/create', async (req: express.Request, res: express.Response) => {

    //desenvolver container de injeção de dependência
    const {name, price, description} = req.body
    const productData = {
        name, 
        price, 
        description
    } as ProductDTO

    const productDataAccess = new ProductDataAccess()
    const productController = new ProductControllerImpl(productDataAccess)
    const productResponse = await productController.create(productData)

    res.status(productResponse.status).json(productResponse)
})

export default Router