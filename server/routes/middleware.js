// const jwt = require('jsonwebtoken');
// console.log('77777')

// function authenticateToken (req, res, next ) {
//   const authHeader = req && req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token === null) return res.sendStatus(401);
  
//   if (token) {
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, value) => {
//       if (err) return res.sendStatus(403)
//       console.log(req, value)
//       next();
//   })
//   }
// }

// module.exports = authenticateToken();