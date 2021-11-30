import express from 'express'
const Router = express.Router()

import * as UserController from '../controller/user'

Router.get('/:id', UserController.Get)
Router.delete('/:id', UserController.Delete)

export default Router
