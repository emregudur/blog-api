import jwt from 'jsonwebtoken'
import User from '../models/user'

export function Verify(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(401).send({ status: false, message: 'Token required' })

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).send({ status: false, message: 'Auth failed', error: err })

    if (!decoded.isAdmin && (decoded.active === false || decoded.active === undefined)) return res.status(401).send({ status: false, message: 'Auth failed, user not active.' })

    let check = await User.find({ userId: decoded.userId })
    if (!check) return res.status(401).send({ status: false, message: 'Auth failed, user not found!' })
    else {
      req.user = decoded
      next()
    }
  })
}
