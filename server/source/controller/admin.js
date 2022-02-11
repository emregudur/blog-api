import { defaultProjection, handleErrors } from '../common'
import User from '../models/user'
import Post from '../models/post'
import Category from '../models/category'
import Tag from '../models/tag'
import Comment from '../models/comment'
import Reply from '../models/reply'

export async function GetUsers(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let users = await User.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(users)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function GetPosts(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let posts = await Post.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(posts)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function GetCategory(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let category = await Category.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(category)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function GetTags(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let tags = await Tag.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(tags)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function GetComments(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let comment = await Comment.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(comment)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function GetReply(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    let reply = await Reply.find({}, defaultProjection).sort({ _id: -1 })

    res.status(200).send(reply)
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetUserUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { userId } = req.params
    await User.updateOne({ userId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetUserActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { userId } = req.params
    await User.updateOne({ userId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetPostUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { postId } = req.params
    await Post.updateOne({ postId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetPostActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { postId } = req.params
    await Post.updateOne({ postId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetCommentUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { commentId } = req.params
    await Comment.updateOne({ commentId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetCommentActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { commentId } = req.params
    await Comment.updateOne({ commentId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetReplyUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { replyId } = req.params
    await Reply.updateOne({ replyId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetReplyActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { replyId } = req.params
    await Reply.updateOne({ replyId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetCategoryUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { categoryId } = req.params
    await Category.updateOne({ categoryId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetCategoryActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { categoryId } = req.params
    await Category.updateOne({ categoryId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetTagUnactive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { tagId } = req.params
    await Tag.updateOne({ tagId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetTagActive(req, res, next) {
  try {
    if (!req.user.isAdmin) throw new Error('Unauthorized')

    const { tagId } = req.params
    await Tag.updateOne({ tagId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}
