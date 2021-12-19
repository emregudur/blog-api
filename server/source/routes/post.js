import express from 'express'
import { upload } from '../common'
const Router = express.Router()

import * as PostController from '../controller/post'

Router.get('/', PostController.Get)
Router.get('/:page/page', PostController.GetPaginate)
Router.get('/user/:userId', PostController.Get)

Router.post('/add', upload()[0].single('file'), PostController.Add)

Router.put('/:id', PostController.Update)

Router.delete('/:id', PostController.Delete)

export default Router
