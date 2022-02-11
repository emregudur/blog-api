import jwt from 'jsonwebtoken'
import { encrypPassword, handleErrors } from '../common'
import User, { userProjection } from '../models/user'

export async function GetToken(req, res, next) {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email }, userProjection)

    if (!user) {
      throw new Error('Auth failed, user not found')
    }

    if (user.password !== encrypPassword(password)) {
      throw new Error('Auth failed, email or password wrong')
    } else if (user.active === false) {
      throw new Error('Auth failed, user not active')
    } else {
      let payload = {
        ...user,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      })

      res.json({ status: true, token })
    }
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}
