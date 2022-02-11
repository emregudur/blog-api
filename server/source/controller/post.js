import { generateUniqueId, handleErrors, slugify, getFileStoredFileds } from '../common'
import Post, { postProjection } from '../models/post'
import Category, { categoryProjection } from '../models/category'
import Tag, { tagProjection } from '../models/tag'
import User, { userProjection } from '../models/user'

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
    let posts = await Post.find({ ...defaultPostFilter, accessLink: req.params.id }, postProjection)

    let data = await postUserInfo(posts)

    res.status(200).send(data[0])
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
        return await new Tag(
          {
            tagId: generateUniqueId(),
            name: tagName,
            userId: req.user.userId,
          },
          tagProjection
        ).save()
      })
    )

    // TODO: check category names on db
    let savedCategories = await Promise.all(
      JSON.parse(categories).map(async categoryName => {
        return await new Category(
          {
            categoryId: generateUniqueId(),
            name: categoryName,
            userId: req.user.userId,
          },
          categoryProjection
        ).save()
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

    let data = await new Post(postData, postProjection).save()

    res.status(200).send(data)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
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
