import express from 'express'
const Router = express.Router()

import * as AuthController from '../controller/auth'

Router.post('/token', AuthController.GetToken)
Router.post('/refresh', AuthController.Refresh)
Router.post('/verify', AuthController.Verify)
Router.delete('/:id', AuthController.Delete)

export default Router
