import { generateUniqueId, handleErrors } from '../common'
import Comment from '../models/comment'

export async function AddReply(req, res) {
  try {
    res.status(200).send({ status: true, message: 'Reply Added' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function UpdateReply(req, res) {
  try {
    res.status(200).send({ status: true, message: 'Reply Updated' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}

export async function DeleteReply(req, res) {
  try {
    res.status(200).send({ status: true, message: 'Reply Deleted' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
