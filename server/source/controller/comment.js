import { defaultProjection, generateUniqueId, handleErrors } from '../common'
import Comment from '../models/comment'
import Reply from '../models/reply'

export async function GetComments(req, res) {
  try {
    const { postId } = req.params

    let comments = await Comment.find({ postId }, defaultProjection).sort({ _id: -1 })
    let reply = await Reply.find({ postId }, defaultProjection).sort({ _id: -1 })
    let withReply = comments.map(comment => {
      return {
        ...comment._doc,
        text: comment.active ? comment.text : 'This comment waiting approve...',
        reply: reply
          .filter(x => x.commentId === comment.commentId)
          .map(x => {
            return {
              ...x._doc,
              text: x.active ? x.text : 'This reply waiting approve...',
            }
          }),
      }
    })

    res.status(200).send(withReply)
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function AddComment(req, res) {
  try {
    const { text, postId } = req.body

    // TODO: check post owner for active field

    await new Comment({
      text,
      commentId: generateUniqueId(),
      postId,
      userId: req.user.userId,
      fullname: `${req.user.name} ${req.user.surname}`,
      email: req.user.email,
      reply: [],
    }).save()

    res.status(200).send({ status: true, message: 'Comment Added' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function UpdateComment(req, res) {
  try {
    const { commentId, text, postId } = req.body

    let t = await Comment.updateOne({ commentId, postId, userId: req.user.userId }, { text })
    console.log(t, commentId, text, postId)
    res.status(200).send({ status: true, message: 'Comment Updated' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function DeleteComment(req, res) {
  try {
    const { commentId, postId } = req.body

    Comment.deleteOne({ commentId, postId, userId: req.user.userId })

    res.status(200).send({ status: true, message: 'Comment Deleted' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function ApproveComment(req, res) {
  try {
    const { postId, commentId } = req.body

    let post = await Post.findOne({ postId })
    if (!post || post.userId !== req.user.userId) throw { status: false, message: 'unaouthorized' }

    Comment.updateOne({ postId, commentId }, { active: true })
    res.status(200).send({ status: true, message: 'Comment Approved' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
