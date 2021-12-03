import express from 'express'
const Router = express.Router()

import * as AuthController from '../controller/auth'

Router.post('/token', AuthController.GetToken)

export default Router
