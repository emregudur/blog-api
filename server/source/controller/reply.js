import { generateUniqueId, handleErrors } from '../common'
import Post from '../models/post'
import Reply from '../models/reply'

export async function AddReply(req, res) {
  try {
    const { text, postId, commentId } = req.body

    new Reply({
      text,
      commentId,
      replyId: generateUniqueId(),
      postId,
      userId: req.user.userId,
      fullname: `${req.user.name} ${req.user.surname}`,
      email: req.user.email,
    }).save()

    res.status(200).send({ status: true, message: 'Reply Added' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function UpdateReply(req, res) {
  try {
    const { replyId, commentId, text } = req.body

    Reply.updateOne({ replyId, commentId, userId: req.user.userId }, { text })

    res.status(200).send({ status: true, message: 'Reply Updated' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function DeleteReply(req, res) {
  try {
    const { commentId, replyId } = req.body

    Reply.deleteOne({ replyId, commentId, userId: req.user.userId })

    res.status(200).send({ status: true, message: 'Reply Deleted' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function ApproveReply(req, res) {
  try {
    const { postId, replyId } = req.body

    let post = await Post.findOne({ postId })
    if (!post || post.userId !== req.user.userId) throw { status: false, message: 'unaouthorized' }

    Reply.updateOne({ postId, replyId }, { active: true })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
