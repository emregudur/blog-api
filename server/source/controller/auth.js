import jwt from 'jsonwebtoken'
import { encrypPassword } from '../common'
import User from '../models/user'

export async function GetToken(req, res, next) {
  const { email, password } = req.body
  try {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err) throw err

        if (!user) {
          return res.status(401).json({ status: false, message: 'Auth failed, user not found' })
        }

        if (user.password !== encrypPassword(password)) {
          return res.status(401).json({ status: false, message: 'Auth failed, email or password wrong' })
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
    console.error(error)
  }
}
