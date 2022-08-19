import jwt from 'jsonwebtoken'
import { encrypPassword, handleErrors } from '../common'
import User from '../models/user'

export async function GetToken(req, res, next) {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email })

    if (!user) {
      res.status(200).send(handleErrors('Auth failed, user not found'))
    }

    if (user.password !== encrypPassword(password)) {
      res.status(200).send(handleErrors('Auth failed, email or password wrong'))
      // throw new Error('Auth failed, email or password wrong', 123)
    } else if (user.active === false) {
      res.status(200).send(handleErrors('Auth failed, user not active'))
      // throw new Error('Auth failed, user not active')
    } else {
      let payload = {
        ...user._doc,
      }

      delete payload.password
      delete payload._id
      delete payload.__v

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      })

      res.json({ status: true, token })
    }
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
