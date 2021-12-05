import User from '../models/user'
import { encrypPassword, generateUniqueId, securePassCheck } from '../common'

export async function register(req, res, next) {
  const { username, password, email, surname, name } = req.body

  if (securePassCheck(password).length > 0) res.status(400).json({ status: false, message: securePassCheck(password).join('\n') })

  let userModel = new User({
    userId: generateUniqueId(),
    username,
    password: encrypPassword(password),
    email,
    surname,
    name,
  })

  // TODO: send email

  userModel
    .save()
    .then(json => {
      res.send({ status: true, message: 'Successful' })
    })
    .catch(err => res.status(500).json({ err }))
}
