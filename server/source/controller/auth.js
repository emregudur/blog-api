import jwt from 'jsonwebtoken'
import { encrypPassword } from '../common'
import User from '../models/user'

export async function GetToken(req, res, next) {
  const { username, password } = req.body
  try {
    User.findOne(
      {
        username,
      },
      (err, user) => {
        if (err) throw err

        if (!user) {
          return res.status(401).json({ status: false, message: 'Auth failed, user not found' })
        }

        if (user.password !== encrypPassword(password)) {
          return res.status(401).json({ status: false, message: 'Auth failed, username or password wrong' })
        } else {
          let payload = {
            userId: user.userId,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
            surname: user.surname,
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
          })

          res.json({ status: true, token })
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export async function Verify(req, res, next) {
  console.log(req.path, req.method)
  if ((req.path === '/post' || req.path === '/post/') && req.method === 'GET') {
    next()
    return
  }

  if ((req.path === '/auth/token' || req.path === '/auth/token/') && req.method === 'POST') {
    next()
    return
  }

  if ((req.path === '/register' || req.path === '/register/') && req.method === 'POST') {
    next()
    return
  }

  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(401).send({ status: false, message: 'Token required' })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ status: false, message: 'Auth failed', error: err })

    req.user = decoded
    next()
  })
}
