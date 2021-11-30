import createError from 'http-errors'
import crypto from 'crypto'
import { GridFsStorage } from 'multer-gridfs-storage'
import { mongodbConnectionUri } from '../common'
import multer from 'multer'
import path from 'path'

import userRouter from './user'
import postRouter from './post'
import fileRouter from './file'
import authRouter from './auth'
import registerRouter from './register'

import { Verify as AuthMiddleware } from '../controller/auth'

export default function setRoutes(app) {
  app.use('/', AuthMiddleware)
  app.use('/user', userRouter)
  app.use('/post', postRouter)
  app.use('/auth', authRouter)
  app.use('/register', registerRouter)

  const storage = new GridFsStorage({
    url: mongodbConnectionUri(),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })

  const upload = multer({ storage })
  app.use('/file', fileRouter(upload))

  app.use((req, res, next) => {
    // req.clientId = getClientIdFromToken(req.token || 1);
    //req.CONFIG = CONFIG;
    next()
  })

  app.use((req, res, next) => {
    next(createError(404))
  })

  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    console.log(err)
    res.status(err.status || 500)
    res.send({ message: err.message })
  })
}
