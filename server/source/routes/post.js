import express from 'express'
import { upload } from '../common'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as PostController from '../controller/post'

Router.get('/', PostController.Get)
Router.get('/:id', PostController.GetWidthId)
Router.get('/:page/page', PostController.GetPaginate)
Router.get('/user/:userId', PostController.Get)
Router.get('/search/:search', PostController.Search)

Router.post(
  '/add',
  AuthMiddleware,
  upload().fields([
    { name: 'postFile', maxCount: 1 },
    { name: 'postImage', maxCount: 1 },
    { name: 'dependentFiles', maxCount: 10 },
  ]),
  PostController.Add
)

Router.put('/:id', AuthMiddleware, PostController.Update)

Router.delete('/:id', AuthMiddleware, PostController.Delete)

export default Router
