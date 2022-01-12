import { generateUniqueId, handleErrors, clearMongoData, slugify, getFileStoredFileds } from '../common'
import Post from '../models/post'
import User, { clearUserModel } from '../models/user'

const POST_LIMIT_SIZE = 4

export async function Get(req, res, next) {
  try {
    let posts = await Post.find({}).sort({ _id: -1 }).skip().limit(4)

    let data = await Promise.all(
      posts.map(async x => {
        delete x._id
        let usr = await User.findOne({ userId: x.userId })

        return { ...x._doc, user: clearUserModel(usr) }
      })
    )
    res.status(200).send(clearMongoData(data))
  } catch (error) {
    res.status(500).send(handleErrors(error))
  }
}

export async function GetWidthId(req, res) {
  try {
    let posts = await Post.find({ accessLink: req.params.id })

    let data = await Promise.all(
      posts.map(async x => {
        delete x._id
        let usr = await User.findOne({ userId: x.userId })

        return { ...x._doc, user: clearUserModel(usr) }
      })
    )
    res.status(200).send(clearMongoData(data[0]))
  } catch (error) {
    res.status(500).send(handleErrors(error))
  }

}

export async function Add(req, res, next) {
  try {
    const { title, tags, categories } = req.body
    const { userId } = req.user
    const files = req.files
    let postId = generateUniqueId()

    let dependentFilesStore = getFileStoredFileds(files.dependentFilesStore)
    let fileId = files.postFile[0].filename
    let postImage = files.postImage[0].filename

    let postData = {
      postId,
      userId,
      title,
      fileId,
      postImage,
      tags: JSON.parse(tags),
      categories: JSON.parse(categories),
      dependentFilesStore,
      accessLink: slugify(title),
    }

    let data = await new Post(postData).save()
    delete data._doc['dependentFilesStore']

    res.status(200).send(clearMongoData(data._doc))
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetPaginate(req, res) {
  const { page } = req.params
  let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

  try {
    let posts = await Post.find({ private: false })
      .sort({ _id: -1 })
      .skip(start * 4)
      .limit(4)

    let data = await Promise.all(
      posts.map(async x => {
        delete x._id
        let usr = await User.findOne({ userId: x.userId })

        return { ...x._doc, user: clearUserModel(usr) }
      })
    )

    res.status(200).send(clearMongoData(data))
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
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
