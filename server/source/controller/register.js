import User from '../models/user'
import { encrypPassword, generateUniqueId, handleErrors, securePassCheck } from '../common'

export async function register(req, res, next) {
  try {
    const { password, email, surname, name } = req.body

    if (securePassCheck(password).length > 0) res.status(400).json({ status: false, message: securePassCheck(password).join('\n') })

    let userModel = new User({
      userId: generateUniqueId(),
      password: encrypPassword(password),
      email,
      surname,
      name,
    })

    await userModel.save()
    // TODO: send email

    res.send({ status: true, message: 'Successful' })
  } catch (error) {
    res.status(200).send(handleErrors(error))
  }
}
