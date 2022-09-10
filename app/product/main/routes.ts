import * as express from 'express'

const Router: express.Router = express.Router()

import { Product } from '../domain/data/entity/product';
import { container } from '../../container';
import { auth } from '../../authentication/main/middleware/auth';

Router.post('/product', auth, async (req: express.Request, res: express.Response) => {

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

Router.put('/product', auth, async (req: express.Request, res: express.Response) => {

    const {id, name, price, description} = req.body
    const productData = {
        id,
        name, 
        price, 
        description
    } as Product

    const containerInject = container()
    const productController = await containerInject.createProductController()
    const productResponse = await productController.update(productData)

    res.status(productResponse.statusCode).json(productResponse)
})

Router.get('/product/', async (req: express.Request, res: express.Response) => {

    const containerInject = container()
    const productController = await containerInject.createProductController()
    const productResponse = await productController.get()

    res.status(productResponse.statusCode).json(productResponse)
})

export default Router