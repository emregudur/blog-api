import express from 'express'
const Router = express.Router()
import { Verify as AuthMiddleware } from '../middlewares/auth'

import * as UserController from '../controller/user'
import { upload } from '../common'

Router.get('/:id', UserController.Get)
Router.get('/post/:page/page', AuthMiddleware, UserController.GetUserProfilePosts)
Router.get('/post/:postId', AuthMiddleware, UserController.GetUserPostWithId)
Router.get('/action/:postId/comment/:commentId/active', AuthMiddleware, UserController.SetCommentActive)
Router.get('/action/:postId/comment/:commentId/unactive', AuthMiddleware, UserController.SetCommentUnactive)
Router.get('/action/:postId/reply/:replyId/active', AuthMiddleware, UserController.SetReplyActive)
Router.get('/action/:postId/reply/:replyId/unactive', AuthMiddleware, UserController.SetReplyUnactive)
Router.get('/action/:postId/toggle/private', AuthMiddleware, UserController.TogglePostPrivate)
Router.get('/picture/:id', UserController.GetPicture)
Router.post('/picture', AuthMiddleware, upload(true).fields([{ name: 'image', maxCount: 1 }]), UserController.SetPicture)

export default Router
