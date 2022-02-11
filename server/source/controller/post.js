import { generateUniqueId, handleErrors, clearMongoData, slugify, getFileStoredFileds } from '../common'
import Post, { clearPostModel } from '../models/post'
import Category, { clearCategoryModel } from '../models/category'
import Tag, { clearTagModel } from '../models/tag'
import User, { clearUserModel } from '../models/user'

const POST_LIMIT_SIZE = 4
const defaultPostFilter = {
  active: true,
  private: false,
}

async function postUserInfo(posts) {
  return await Promise.all(
    posts.map(async x => {
      let usr = await User.findOne({ userId: x.userId })

      return { ...clearPostModel(x)._doc, user: clearUserModel(usr) }
    })
  )
}

export async function GetSlug(req, res) {
  try {
    let posts = await Post.find({ ...defaultPostFilter, accessLink: req.params.id })

    let data = await postUserInfo(posts)

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

    let dependentFiles = getFileStoredFileds(files.dependentFiles)
    let fileId = files.postFile[0].filename
    let postImage = files.postImage[0].filename

    // TODO: check tag names on db
    let savedTags = await Promise.all(
      JSON.parse(tags).map(async tagName => {
        let tag = await new Tag({
          tagId: generateUniqueId(),
          name: tagName,
          userId: req.user.userId,
        }).save()

        return clearTagModel(tag)
      })
    )

    // TODO: check category names on db
    let savedCategories = await Promise.all(
      JSON.parse(categories).map(async categoryName => {
        let category = await new Category({
          categoryId: generateUniqueId(),
          name: categoryName,
          userId: req.user.userId,
        }).save()

        return clearCategoryModel(category)
      })
    )

    let postData = {
      postId,
      userId,
      title,
      fileId,
      postImage,
      tags: savedTags,
      categories: savedCategories,
      dependentFiles,
      accessLink: slugify(title),
    }

    let data = await new Post(postData).save()

    res.status(200).send(clearPostModel(data))
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetPage(req, res) {
  try {
    let { page } = req.params
    page = parseInt(page)
    let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

    let posts = await Post.find({ ...defaultPostFilter })
      .sort({ _id: -1 })
      .skip(start)
      .limit(POST_LIMIT_SIZE)
    let data = await postUserInfo(posts)

    res.status(200).send(clearMongoData(data))
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

    let posts = await Post.find({ ...defaultPostFilter, userId })
      .sort({ _id: -1 })
      .skip(start)
      .limit(POST_LIMIT_SIZE)

    res.status(200).send(clearMongoData(posts))
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function Search(req, res) {
  try {
    const { search } = req.params
    let posts = await Post.find({ ...defaultPostFilter, title: { $regex: search, $options: 'i' } })
      .sort({ _id: -1 })
      .limit(4)

    let data = await postUserInfo(posts)

    res.status(200).send(clearMongoData(data))
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
