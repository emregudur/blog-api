import createError from 'http-errors'
import userRouter from './user'
import postRouter from './post'
import fileRouter from './file'
import authRouter from './auth'
import registerRouter from './register'

import { Verify as AuthMiddleware } from '../middlewares/auth'

export default function setRoutes(app) {
  // app.use('/', AuthMiddleware)
  app.use('/user', userRouter)
  app.use('/post', postRouter)
  app.use('/auth', authRouter)
  app.use('/register', registerRouter)
  app.use('/file', fileRouter)

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

    res.status(err.status || 500)
    res.send({ message: err.message })
  })
}
