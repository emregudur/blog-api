import { generateUniqueId, handleErrors, upload } from '../common'
import Post from '../models/post'
import User from '../models/user'
import { FileModelSave } from '../controller/file'

const POST_LIMIT_SIZE = 4

export async function Get(req, res, next) {
  Post.find({})
    .populate('user')
    .skip()
    .limit(4)
    .then(payload => {
      let data = payload.map(async x => {
        delete x._id
        let usr = await User.findOne({ userId: x.userId })
        return { data: x, user: usr }
      })
      console.log(data, payload)
      res.status(200).send({ data })
    })
    .catch(err => res.status(500).send(handleErrors(err)))
}

export async function Add(req, res, next) {
  const { title } = req.body
  const { userId: authenticatedUserId } = req.user
  let postId = generateUniqueId()
  req.dependentPostId = postId
  let savedFile = await FileModelSave(req)

  let post = new Post({
    postId,
    userId: authenticatedUserId,
    fileId: savedFile.file.fileId,
    title,
  })

  let data = await post.save()

  res.send({ status: true, data })
}

export async function GetPaginate(req, res) {
  const { page } = req.params

  let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

  Post.find({ private: false })
    .skip(start + 4)
    .limit(4)
    .then(payload => {
      let data = payload.map(x => {
        delete x._id
      })
      res.status(200).send(data)
    })
    .catch(err => res.status(500).send(handleErrors(err)))
}
export async function Update(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function Delete(req, res, next) {
  if (!req.user.isAdmin) res.status(401).send({ status: false, message: 'Unauthorized' })

  const { id: postId } = req.query

  Post.deleteOne({ postId })
    .then(payload => {
      res.status(200).send({ status: true, message: 'Successful' })
    })
    .catch(err => res.status(401).send(handleErrors(err)))
}
