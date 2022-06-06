import { generateUniqueId, handleErrors, slugify, upload } from '../common'
import Post, { postProjection } from '../models/post'
import Category from '../models/category'
import Tag from '../models/tag'
import User, { userProjection } from '../models/user'
import { defaultProjection } from '../common'

const POST_LIMIT_SIZE = 4
const defaultPostFilter = {
  active: true,
  private: false,
}

async function postUserInfo(posts) {
  return await Promise.all(
    posts.map(async x => {
      let user = await User.findOne({ userId: x.userId }, userProjection)

      return { ...x._doc, user }
    })
  )
}

export async function GetSlug(req, res) {
  try {
    let post = await Post.findOne({ accessLink: req.params.id }, postProjection)

    let data = await postUserInfo([post])

    res.status(200).send(data[0])
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetSlugFromProfile(req, res) {
  try {
    let post = await Post.findOne({ accessLink: req.params.id }, postProjection)

    if (post.userId !== req.user.userId && (post.private || !post.active)) {
      throw new Error("You can't access this post!")
    }
    let data = await postUserInfo([post])

    res.status(200).send(data[0])
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function Add(req, res, next) {
  let postId = generateUniqueId()
  req.postId = postId

  let updatePostFiles = upload(false, true).fields([
    { name: 'postFile', maxCount: 1 },
    { name: 'postImage', maxCount: 1 },
  ])

  updatePostFiles(req, res, async err => {
    if (err) {
      // A Multer error occurred when uploading.
      res.status(200).send(handleErrors(err))
    }
    try {
      const { title, tags, categories } = req.body
      const { userId } = req.user

      let postData = {
        postId,
        userId,
        title,
        fileId: req.files.postFile[0].metadata.fileId,
        postImage: req.files.postImage[0].metadata.fileId,
        tags: JSON.parse(tags),
        categories: JSON.parse(categories),
        accessLink: slugify(title),
      }
      console.log(postData)

      let data = await new Post(postData).save()

      res.status(200).send(data)
    } catch (error) {
      // TODO: remove saved files
      res.status(200).send(handleErrors(error))
    }
  })
}

export async function GetPage(req, res) {
  try {
    let { page } = req.params
    page = parseInt(page)
    let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

    let posts = await Post.find({ ...defaultPostFilter }, postProjection)
      .sort({ _id: -1 })
      .skip(start)
      .limit(POST_LIMIT_SIZE)

    let data = await postUserInfo(posts)

    res.status(200).send(data)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function Update(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function GetUserPosts(req, res) {
  try {
    let { userId, page } = req.params
    page = parseInt(page)
    let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

    let posts = await Post.find({ ...defaultPostFilter, userId }, postProjection)
      .sort({ _id: -1 })
      .skip(start)
      .limit(POST_LIMIT_SIZE)

    res.status(200).send(posts)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function Search(req, res) {
  try {
    const { search } = req.params
    let posts = await Post.find({ ...defaultPostFilter, title: { $regex: search, $options: 'i' } }, postProjection)
      .sort({ _id: -1 })
      .limit(4)

    let data = await postUserInfo(posts)

    res.status(200).send(data)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetCategory(req, res, next) {
  try {
    if (!req.user) throw new Error('Unauthorized')

    let category = await Category.find({}).sort({ _id: -1 })

    res.status(200).send(category)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetTags(req, res, next) {
  try {
    if (!req.user) throw new Error('Unauthorized')

    let tags = await Tag.find({}).sort({ _id: -1 })

    res.status(200).send(tags)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
