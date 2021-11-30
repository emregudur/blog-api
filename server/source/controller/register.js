import User from '../models/user'
import { encrypPassword, generateUniqueId } from '../common'

export async function register(req, res, next) {
  const { username, password, email, surname, name } = req.body

  let userModel = new User({
    userId: generateUniqueId(),
    username,
    password: encrypPassword(password),
    email,
    surname,
    name,
  })

  userModel
    .save()
    .then(json => {
      res.send(json)
    })
    .catch(err => res.status(500).json({ err }))
}
