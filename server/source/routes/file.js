import express from 'express'
const fileRouter = express.Router()
import mongoose from 'mongoose'
import File from '../models/file'
import { generateUniqueId, mongodbConnectionUri } from '../common'
import path from 'path'

module.exports = upload => {
  const url = mongodbConnectionUri()
  const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true })

  let gfs

  connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: 'uploads',
    })
  })

  fileRouter.route('/').post(upload.single('file'), (req, res, next) => {
    console.log(req.file)
    if (!req.body.category && (req.body.category !== 'post' || req.body.category !== 'postFile'))
      return res.status(200).json({
        success: false,
        message: 'Category Required',
      })

    if (req.body.category === 'post' && req.file.contentType !== 'text/markdown')
      return res.status(200).json({
        success: false,
        message: 'Not supported post file type',
      })

    if (req.body.category === 'postFile' && req.file.contentType !== 'image/jpeg' && req.file.contentType !== 'image/jpg' && req.file.contentType !== 'image/png' && req.file.contentType !== 'image/svg')
      return res.status(200).json({
        success: false,
        message: 'Not supported file type',
      })

    let newFile = new File({
      filename: req.file.filename,
      category: req.body.category,
      fileId: generateUniqueId(),
      userId: req.user.userId,
      ext: path.extname(req.file.filename).toUpperCase().replace(/./, ''),
    })

    newFile
      .save()
      .then(file => {
        res.status(200).json({
          success: true,
          file,
        })
      })
      .catch(err => res.status(500).json(err))
  })

  fileRouter.route('/delete/:id').get((req, res, next) => {
    File.findOne({ _id: req.params.id })
      .then(file => {
        if (file) {
          File.deleteOne({ _id: req.params.id })
            .then(() => {
              return res.status(200).json({
                success: true,
                message: `File with ID: ${req.params.id} deleted`,
              })
            })
            .catch(err => {
              return res.status(500).json(err)
            })
        } else {
          res.status(200).json({
            success: false,
            message: `File with ID: ${req.params.id} not found`,
          })
        }
      })
      .catch(err => res.status(500).json(err))
  })

  fileRouter.route('/recent').get((req, res, next) => {
    File.findOne({}, {}, { sort: { '_id': -1 } })
      .then(file => {
        res.status(200).json({
          success: true,
          file,
        })
      })
      .catch(err => res.status(500).json(err))
  })

  fileRouter.route('/multiple').post(upload.array('file', 3), (req, res, next) => {
    res.status(200).json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
    })
  })

  fileRouter.route('/all').get((req, res, next) => {
    gfs.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No files available',
        })
      }

      files.map(file => {
        if (file.contentType === 'file/jpeg' || file.contentType === 'file/png' || file.contentType === 'file/svg') {
          file.isFile = true
        } else {
          file.isFile = false
        }
      })

      res.status(200).json({
        success: true,
        files,
      })
    })
  })

  fileRouter.route('/:filename').get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No files available',
        })
      }

      gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    })
  })

  fileRouter.route('/del/:id').post((req, res, next) => {
    console.log(req.params.id)
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) {
        return res.status(404).json({ err: err })
      }

      res.status(200).json({
        success: true,
        message: `File with ID ${req.params.id} is deleted`,
      })
    })
  })

  return fileRouter
}
