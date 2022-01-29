import { handleErrors } from '../common'
import User from '../models/user'

export async function Get(req, res, next) {
  const { id: userId } = req.params
  let user = await getUser(userId)
  res.status(200).send(user)
}

export const getUser = async userId => {
  return await User.findOne({ userId })
    .then(user => {
      delete user._doc._id
      delete user._doc.__v
      delete user._doc.password
      !user._doc.isAdmin ? delete user._doc.isAdmin : null
      return user
    })
    .catch(err => res.status(401).send(handleErrors(err)))
}
