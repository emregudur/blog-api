import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as AdminController from '../controller/admin'

Router.get('/user/', AuthMiddleware, AdminController.GetUsers)
Router.get('/user/deactive/:userId', AuthMiddleware, AdminController.SetUserUnactive)
Router.get('/user/activate/:userId', AuthMiddleware, AdminController.SetUserActive)

Router.get('/post/', AuthMiddleware, AdminController.GetPosts)
Router.get('/post/deactive/:postId', AuthMiddleware, AdminController.SetPostUnactive)
Router.get('/post/activate/:postId', AuthMiddleware, AdminController.SetPostActive)

Router.get('/comment/', AuthMiddleware, AdminController.GetComments)
Router.get('/comment/deactive/:commentId', AuthMiddleware, AdminController.SetCommentUnactive)
Router.get('/comment/activate/:commentId', AuthMiddleware, AdminController.SetCommentActive)

Router.get('/reply/', AuthMiddleware, AdminController.GetReply)
Router.get('/reply/deactive/:replyId', AuthMiddleware, AdminController.SetReplyUnactive)
Router.get('/reply/activate/:replyId', AuthMiddleware, AdminController.SetReplyActive)

Router.get('/category/', AuthMiddleware, AdminController.GetCategory)
Router.post('/category/add', AuthMiddleware, AdminController.AddCategoty)
Router.get('/category/deactive/:categoryId', AuthMiddleware, AdminController.SetCategoryUnactive)
Router.get('/category/activate/:categoryId', AuthMiddleware, AdminController.SetCategoryActive)

Router.get('/tag/', AuthMiddleware, AdminController.GetTags)
Router.post('/tag/add', AuthMiddleware, AdminController.AddTag)
Router.get('/tag/deactive/:tagId', AuthMiddleware, AdminController.SetTagUnactive)
Router.get('/tag/activate/:tagId', AuthMiddleware, AdminController.SetTagActive)

export default Router
