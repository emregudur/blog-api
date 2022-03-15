import { defaultProjection, gridFsStorage, handleErrors } from '../common'
import User, { userProjection } from '../models/user'
import Post, { postProjection } from '../models/post'
import Comment from '../models/comment'
import Reply from '../models/reply'

const POST_LIMIT_SIZE = 4

export async function Get(req, res) {
  try {
    const { id: userId } = req.params
    let user = await User.findOne({ userId }, userProjection)
    res.status(200).send(user)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetUserProfilePosts(req, res) {
  try {
    let { page } = req.params
    page = parseInt(page)
    let start = page > 0 ? (page - 1) * POST_LIMIT_SIZE : 0

    let posts = await Post.find({ userId: req.user.userId }, postProjection).sort({ _id: -1 }).skip(start).limit(POST_LIMIT_SIZE)

    let postsWithComments = await Promise.all(
      posts.map(async post => {
        let comments = await Comment.find({ postId: post.postId }, defaultProjection).sort({ _id: -1 })
        let reply = await Reply.find({ postId: post.postId }, defaultProjection).sort({ _id: -1 })
        let withReply = comments.map(comment => {
          return {
            ...comment._doc,
            reply: reply.filter(x => x.commentId === comment.commentId),
          }
        })
        return {
          ...post._doc,
          comments: withReply,
        }
      })
    )

    res.status(200).send(postsWithComments)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetUserPostWithId(req, res) {
  try {
    let { postId } = req.params

    let post = await Post.findOne({ userId: req.user.userId, postId }, postProjection).sort({ _id: -1 })

    let comments = await Comment.find({ postId: post.postId }, defaultProjection).sort({ _id: -1 })
    let reply = await Reply.find({ postId: post.postId }, defaultProjection).sort({ _id: -1 })
    let withReply = comments.map(comment => {
      return {
        ...comment._doc,
        reply: reply.filter(x => x.commentId === comment.commentId),
      }
    })

    res.status(200).send({
      ...post._doc,
      comments: withReply,
    })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function SetPicture(req, res) {
  try {
    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function GetPicture(req, res) {
  try {
    let gfs = gridFsStorage()
    let { id } = req.params
    gfs.find({ 'metadata.userId': id, 'metadata.profileImage': true }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No files available',
        })
      }

      let filename = files[0].filename
      if (files.length > 1) {
        gfs.delete(files[0]._id)
        filename = files[files.length - 1].filename
      }

      gfs.openDownloadStreamByName(filename).pipe(res)
    })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function SetCommentUnactive(req, res, next) {
  try {
    const { commentId, postId } = req.params

    let post = await Post.findOne({ postId })
    if (post.userId !== req.user.userId) throw new Error('Unauthorized')

    await Comment.updateOne({ commentId, postId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetCommentActive(req, res, next) {
  try {
    const { commentId, postId } = req.params

    let post = await Post.findOne({ postId })
    if (post.userId !== req.user.userId) throw new Error('Unauthorized')

    await Comment.updateOne({ commentId, postId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetReplyUnactive(req, res, next) {
  try {
    const { replyId, postId } = req.params

    let post = await Post.findOne({ postId })
    if (post.userId !== req.user.userId) throw new Error('Unauthorized')

    await Reply.updateOne({ replyId, postId }, { active: false })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function SetReplyActive(req, res, next) {
  try {
    const { replyId, postId } = req.params

    let post = await Post.findOne({ postId })
    if (post.userId !== req.user.userId) throw new Error('Unauthorized')

    await Reply.updateOne({ replyId, postId }, { active: true })

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}

export async function TogglePostPrivate(req, res, next) {
  try {
    const { postId } = req.params

    let post = await Post.findOne({ postId })
    if (post.userId !== req.user.userId) throw new Error('Unauthorized')

    await Post.updateOne({ postId }, [{ $set: { private: { $eq: [false, '$private'] } } }])

    res.status(200).send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(401).send(handleErrors(error))
  }
}
