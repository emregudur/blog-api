import mongoose from 'mongoose'
import { mongodbConnectionUri } from './common'

export default function () {
  console.log(mongodbConnectionUri())
  mongoose
    .connect(mongodbConnectionUri(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
      console.log('mongodb connected')
    })
    .catch(function (err) {
      console.log(err)
    })
}
