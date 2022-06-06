import mongoose from 'mongoose'
import { generateUniqueId, gridFsStorage, upload } from '../common'
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
  const { file } = req
  res.status(200).json({
    success: true,
    fileId: file.metadata.fileId,
    filename: file.originalname,
    mimetype: file.mimetype,
  })
}

export async function GetFile(req, res) {
  let gfs = gridFsStorage()
  try {
    gfs.find({ filename: req.params.id }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No files available',
        })
      }

      gfs.openDownloadStreamByName(req.params.id).pipe(res)
    })
  } catch (error) {
    console.error(error)
  }
}

export async function GetPostFile(req, res) {
  try {
    let gfs = gridFsStorage()
    let { id } = req.params
    gfs.find({ 'metadata.fileId': id, 'metadata.postFile': true }).toArray((err, files) => {
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

export async function DeleteFile(req, res) {
  let gfs = gridFsStorage()

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
