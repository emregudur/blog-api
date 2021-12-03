import express from 'express'
const Router = express.Router()

import * as PostController from '../controller/post'

Router.get('/', PostController.Get)
Router.get('/:page/page', PostController.GetPaginate)
Router.get('/user/:userId', PostController.Get)

Router.post('/add', PostController.Add)

Router.put('/:id', PostController.Update)

Router.delete('/:id', PostController.Delete)

export default Router
