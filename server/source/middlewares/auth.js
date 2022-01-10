import jwt from 'jsonwebtoken'

export async function Verify(req, res, next) {
  console.log(req.path, req.method)
  // if (req.path.replace(/[/]/gi, '') === 'post' && req.method === 'GET') {
  //   next()
  //   return
  // }

  // if ((req.path === '/auth/token' || req.path === '/auth/token/' || req.path.replace(/[/]/gi, '') === 'register') && req.method === 'POST') {
  //   next()
  //   return
  // }

  // if (req.path.replace(/[/]/gi, '') === 'file' && req.method === 'GET') {
  //   next()
  //   return
  // }

  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(401).send({ status: false, message: 'Token required' })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ status: false, message: 'Auth failed', error: err })

    req.user = decoded
    next()
  })
}
