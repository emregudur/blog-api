import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as UserController from '../controller/user'

Router.get('/:id', UserController.Get)
Router.delete('/:id', AuthMiddleware, UserController.Delete)

export default Router
