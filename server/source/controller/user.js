import { handleErrors } from '../common'
import User from '../models/user'

export async function Get(req, res, next) {
  const { id: userId } = req.params
  let user = await getUser(userId)
  res.status(200).send(user)
}

export async function Delete(req, res, next) {
  if (!req.user.isAdmin) res.status(401).send({ status: false, message: 'Unauthorized' })

  const { userId } = req.body

  User.deleteOne({ userId })
    .then(payload => {
      res.status(200).send({ status: true, message: 'Successful' })
    })
    .catch(err => res.status(401).send(handleErrors(err)))
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
    .catch(handleErrors)
}
