import express from 'express'
const Router = express.Router()

import * as RegisterController from '../controller/register'

Router.post('/', RegisterController.register)

export default Router
