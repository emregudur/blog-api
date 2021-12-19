import mongoose from 'mongoose'
import File from '../models/file'
import { generateUniqueId, upload } from '../common'
import path from 'path'

export async function CheckFile(req) {
  if (!req.body.category && (req.body.category !== 'post' || req.body.category !== 'postFile'))
    return {
      success: false,
      message: 'Category Required',
    }

  if (req.body.category === 'post' && req.file.contentType !== 'text/markdown')
    return {
      success: false,
      message: 'Not supported post file type',
    }

  if (req.body.category === 'postFile' && req.file.contentType !== 'image/jpeg' && req.file.contentType !== 'image/jpg' && req.file.contentType !== 'image/png' && req.file.contentType !== 'image/svg')
    return {
      success: false,
      message: 'Not supported file type',
    }

  return { success: true }
}

export async function FileModelSave(req) {
  let newFile = new File({
    filename: req.file.filename,
    category: req.body.category,
    fileId: generateUniqueId(),
    userId: req.user.userId,
    dependentPostId: req.dependentPostId || '',
    ext: path.extname(req.file.filename).toUpperCase().replace(/./, ''),
  })

  return await newFile
    .save()
    .then(file => {
      delete file._id
      return {
        success: true,
        file,
      }
    })
    .catch(err => err)
}

export async function Save(req, res) {
  let check = await CheckFile(req, res)

  if (check.success === false) res.status(200).json(check)

  let newFile = FileModelSave(req)

  newFile
    .save()
    .then(file => {
      res.status(200).json({
        success: true,
        file,
      })
    })
    .catch(err => res.status(500).json(err))
}

export async function GetFile(req, res) {
  let [uploader, gfs] = upload
  gfs.find({ fileId: req.params.id }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      })
    }

    gfs.openDownloadStreamByName(req.params.filename).pipe(res)
  })
}

export async function DeleteFile(req, res) {
  let [uploader, gfs] = upload

  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) {
      return res.status(404).json({ err: err })
    }

    res.status(200).json({
      success: true,
      message: `File with ID ${req.params.id} is deleted`,
    })
  })
}

// fileRouter.route('/multiple').post(upload.array('file', 3), (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: `${req.files.length} files uploaded successfully`,
//   })
// })
