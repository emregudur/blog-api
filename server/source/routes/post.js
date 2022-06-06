import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as PostController from '../controller/post'

Router.get('/:page/page', PostController.GetPage)
Router.get('/user/:userId/:page/page', PostController.GetUserPosts)
Router.get('/search/:search', PostController.Search)
Router.get('/category', PostController.GetCategory)
Router.get('/tags', PostController.GetTags)

Router.get('/:id', PostController.GetSlug)
Router.put('/:id', AuthMiddleware, PostController.Update)

Router.post('/add', AuthMiddleware, PostController.Add)

export default Router
