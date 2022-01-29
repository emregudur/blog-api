import express from 'express'
const Router = express.Router()

import * as UserController from '../controller/user'

Router.get('/:id', UserController.Get)

export default Router
