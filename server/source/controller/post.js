// import Post from '../models/post.model'

export async function Get(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function Add(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function Update(req, res, next) {
  let json = JSON.stringify({ 'test': true })

  res.send(json)
}

export async function Delete(req, res, next) {
  let json = JSON.stringify({ 'test': true })
  res.send(json)
}
