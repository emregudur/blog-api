import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as CommentController from '../controller/comment'

Router.post('/', AuthMiddleware, CommentController.AddComment)
Router.put('/', AuthMiddleware, CommentController.UpdateComment)
Router.delete('/', AuthMiddleware, CommentController.DeleteComment)

export default Router
