import createError from 'http-errors'
import userRouter from './user'
import postRouter from './post'
import fileRouter from './file'
import authRouter from './auth'
import commentRouter from './comment'
import replyRouter from './reply'
import adminRouter from './admin'
import registerRouter from './register'

export default function setRoutes(app) {
  // app.use('/', AuthMiddleware)
  app.use('/user', userRouter)
  app.use('/post', postRouter)
  app.use('/auth', authRouter)
  app.use('/register', registerRouter)
  app.use('/file', fileRouter)
  app.use('/comment', commentRouter)
  app.use('/reply', replyRouter)
  app.use('/admin', adminRouter)

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
