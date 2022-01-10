import express from 'express'
const Router = express.Router()
import { upload } from '../common'

import { Verify as AuthMiddleware } from '../middlewares/auth'
import * as FileController from '../controller/file'

Router.post('/', AuthMiddleware, upload().single('file'), FileController.Save)
Router.get('/:id', FileController.GetFile)
Router.delete('/:id', AuthMiddleware, FileController.DeleteFile)

export default Router
