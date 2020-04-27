var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var connection = require('../config/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(connection, '99')
  res.send('response');
});

router.post('/sign-up', function(req, res, next) {
  const fname = req.body.first_name;
  const lname = req.body.last_name;
  const email = req.body.email;
  const pwd = md5(req.body.password);
  
  const query1 = `SELECT * FROM user_table WHERE email_='${email}'`;
  const query2 = `INSERT INTO user_table (first_name, last_name, email_, password) VALUES ('${fname}', '${lname}', '${email}', '${pwd}')`;
  
  connection.pool.query(query1, (err, result) => {
    if(err) {
      return res.send(err);
    }

    if (result.rowCount === 1) {
      res.send({
        error: false,
        message: 'Email already in use.',
      });
    }
    else {
      connection.pool.query(query2, (err, result) => {
        if(err) {
          res.send({
            error: true,
            message: 'Try again',
          });
        }
        else {
          res.send({
            error: false,
            message: 'Account created',
          });
        }
      });
    }
  });
})

router.post('/sign-in', function(req, res, next) {
  const email = req.body.email;
  const password = md5(req.body.password);
  const query = `SELECT * FROM user_table WHERE email_='${email}'`;

  connection.pool.query(query, (err, result) => {
    if(err) {
      res.send(err);
    }
    else {
      if (result.rowCount === 1) {
        const userInfo = result.rows[0];
        if (userInfo.password === password) {
          const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
          const q1 = `UPDATE user_table SET token='${accessToken}' WHERE id='${userInfo.id}'`;
          connection.pool.query(q1, (err, result) => {
            if (err) {
              res.send(err)
            }
            console.log(result)
          })
          res.send({ 
            message: 'Login successful!',
            accessToken: accessToken,
            result: userInfo
          })
        }
        else {
          res.send({ message: 'password incorrect' });
        }
      }
      else {
        res.send({ message: 'USER NOT EXIST' })
      }
    }
  });
})

router.get('/user-info', function(req, res, next) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400);
    }
  
    const query = `SELECT * FROM user_table WHERE id=${id}`;

    connection.pool.query(query, (err, result) => {
      if(err) {
        throw err;
      }
      else {
        if (result.rowCount !== 1) {
          return res.status(200).json({
            status: 'Success',
            message: 'USER NOT EXIST'
          })
        }
        else {
          res.status(200).json({
            status: 'Success',
            result: result.rows[0]
          });
        }
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         status: "Failed",
         error: err
       })
  }
})

router.get('/receive-message', function(req, res, next) {
  try {
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;

    if (!sender_id || !receiver_id) {
      return res.status(400);
    }
  
    const query = `SELECT * FROM chats_table WHERE (sender_id='${sender_id}' AND receiver_id='${receiver_id}') OR (sender_id='${receiver_id}' AND receiver_id='${sender_id}')`;

    connection.pool.query(query, (err, result) => {
      if(err) {
        throw err;
      }
      else {
        res.json({
          status: "Success",
          result: result.rows
        });
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         status: "Failed",
         error: err
       })
  }
})

router.post('/send-message', function(req, res, next) {
  try {
    const senderId = req.body.sender_id;
    const receiverId = req.body.receiver_id;
    const body = req.body.message;
    const createdAt = req.body.created_at;

    if (!senderId || !receiverId || !body || !createdAt) {
      return res.status(400);
    }
  
    const query = `INSERT INTO chats_table(sender_id, receiver_id, body, created_at) VALUES (${senderId},${receiverId},'${body}','${createdAt}')`;
    
    connection.pool.query(query, (err, result) => {
      if(err) {
        throw err;
      }
      else {
        res.json({
          status: "Success",
          result: result.rowCount
        });
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         status: "Failed",
         error: err
       })
  }
})

router.get('/user-list', function(req, res, next) {
  const query = `SELECT id,first_name,last_name,created_at FROM user_table`;
  
  try {
    connection.pool.query(query, (err, result) => {
      console.log(err, result, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
      if(err) {
        throw err;
      }
      else {
        res.status(200)
           .json({
            status: 'Success',
            result: result.rows
           });
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         status: "Failed",
         error: err
       })
  } 
})

module.exports = router;
