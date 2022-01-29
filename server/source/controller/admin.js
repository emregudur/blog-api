import User from '../models/user'

export async function Delete(req, res, next) {
  if (!req.user.isAdmin) res.status(401).send({ status: false, message: 'Unauthorized' })

  const { userId } = req.body

  User.deleteOne({ userId })
    .then(payload => {
      res.status(200).send({ status: true, message: 'Successful' })
    })
    .catch(err => res.status(401).send(handleErrors(err)))
}
