import * as express from 'express'

const Router: express.Router = express.Router()

Router.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: 'tudo ok!'
    })
})

export default Router