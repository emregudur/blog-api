import { handleErrors } from '../common'
import Post from '../models/post'

export async function Get(req, res, next) {
  const { isAdmin, userId: authenticatedUserId } = req.user
  const { userId, page } = req.query

  if (isAdmin || req.user === undefined)
    Post.find({})
      .then(payload => {
        let data = payload.map(x => delete x._id)
        res.status(200).send(data)
      })
      .catch(err => res.status(500).send(handleErrors(err)))

  if (userId === authenticatedUserId) {
    let start = page > 0 ? (page - 1) * USER_LIMIT_SIZE : 0

    Post.find({ userId })
      .skip(start + 4)
      .limit(4)
      .then(payload => {
        let data = payload.map(x => delete x._id)
        res.status(200).send(data)
      })
      .catch(err => res.status(500).send(handleErrors(err)))
  }
}

export async function Add(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function GetPaginate(req, res) {
  const { userId: authenticatedUserId } = req.user
  const { userId, page } = req.query

  if (userId === authenticatedUserId) {
    let start = page > 0 ? (page - 1) * USER_LIMIT_SIZE : 0

    Post.find({ userId })
      .skip(start + 4)
      .limit(4)
      .then(payload => {
        let data = payload.map(x => delete x._id)
        res.status(200).send(data)
      })
      .catch(err => res.status(500).send(handleErrors(err)))
  }
}
export async function Update(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function Delete(req, res, next) {
  if (!req.user.isAdmin) res.status(401).send({ status: false, message: 'Unauthorized' })

  const { postId } = req.query.id

  Post.deleteOne({ postId })
    .then(payload => {
      res.status(200).send({ status: true, message: 'Successful' })
    })
    .catch(err => res.status(401).send(handleErrors(err)))
}
