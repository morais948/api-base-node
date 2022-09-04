import * as express from 'express'

const Router: express.Router = express.Router()

import { Product } from '../domain/data/entity/product';
import { container } from '../container';

Router.post('/product/create', async (req: express.Request, res: express.Response) => {

    const {name, price, description} = req.body
    const productData = {
        name, 
        price, 
        description
    } as Product

    const containerInject = container()
    const productController = await containerInject.createProductController()
    const productResponse = await productController.create(productData)

    res.status(productResponse.statusCode).json(productResponse)
})

Router.get('/product/', async (req: express.Request, res: express.Response) => {

    const containerInject = container()
    const productController = await containerInject.createProductController()
    const productResponse = await productController.get()

    res.status(productResponse.statusCode).json(productResponse)
})

export default Router