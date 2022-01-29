import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as AdminController from '../controller/admin'

Router.delete('/:id', AuthMiddleware, AdminController.Delete)

export default Router
