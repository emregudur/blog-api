import { generateUniqueId, handleErrors } from '../common'
import Comment from '../models/comment'

export async function AddComment(req, res) {
  try {
    const { comment, postId } = req.body

    let commentModel = new Comment({
      comment,
      commentId: generateUniqueId(),
      userId: req.user.userId,
      fullname: `${req.user.name} ${req.user.surname}`,
      email: req.user.email,
      reply: [],
    })

    await Post.updateOne(
      { postId },
      {
        $push: {
          comments: commentModel,
        },
      }
    )
    res.status(200).send({ status: true, message: 'Comment Added' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function UpdateComment(req, res) {
  try {
    const { commentId, comment, postId } = req.body
    await Post.updateOne(
      { postId },
      {
        '$set': { comment },
        '$push': { 'comments': commentId },
      },
      { 'new': true, 'upsert': true }
    )
    res.status(200).send({ status: true, message: 'Comment Updated' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function DeleteComment(req, res) {
  try {
    const { commentId, postId } = req.body
    await Post.updateOne(
      { postId },
      {
        $pullAll: {
          comment: [{ commentId }],
        },
      }
    )
    res.status(200).send({ status: true, message: 'Comment Deleted' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
