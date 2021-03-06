import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as CommentController from '../controller/comment'

Router.get('/:postId', CommentController.GetComments)
Router.post('/approve', AuthMiddleware, CommentController.ApproveComment)
Router.post('/', AuthMiddleware, CommentController.AddComment)
Router.put('/', AuthMiddleware, CommentController.UpdateComment)
Router.delete('/', AuthMiddleware, CommentController.DeleteComment)

export default Router
