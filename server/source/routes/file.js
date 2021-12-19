import express from 'express'
const Router = express.Router()
import { upload } from '../common'

import * as FileController from '../controller/file'

Router.post('/', upload()[0].single('file'), FileController.Save)
Router.get('/:id', FileController.GetFile)
Router.delete('/:id', FileController.DeleteFile)

export default Router
