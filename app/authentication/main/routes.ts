import * as express from 'express'

const Router: express.Router = express.Router()
import { container } from '../../container';

Router.post('/login', async (req: express.Request, res: express.Response) => {

    const {email, password} = req.body

    const containerInject = container()
    const authController = await containerInject.createAuthController()
    const authResponse = await authController.login(email, password)

    res.status(authResponse.statusCode).json(authResponse)
})

export default Router