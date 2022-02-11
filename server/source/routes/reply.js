import express from 'express'
const Router = express.Router()

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as ReplyController from '../controller/Reply'

Router.post('/approve', AuthMiddleware, ReplyController.ApproveReply)
Router.post('/', AuthMiddleware, ReplyController.AddReply)
Router.put('/', AuthMiddleware, ReplyController.UpdateReply)
Router.delete('/', AuthMiddleware, ReplyController.DeleteReply)

export default Router
