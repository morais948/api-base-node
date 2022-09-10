import * as express from 'express'
import { Application } from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import cors from './product/main/middlewares/cors'
import routerProduct from './product/main/routes'
import routerAtuh from './authentication/main/routes'

const app: Application = express()

app.use('/static', express.static(path.resolve(__dirname + '/static')))
app.use(bodyParser.json())
app.use(cors)
app.use(routerProduct)
app.use(routerAtuh)

export default app