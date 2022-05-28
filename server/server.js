const express = require('express');
const db = require('./database');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
  console.log('Server is running on PORT: ' + HTTP_PORT);
});

app.get('/', (req, res, next) => {
  return res.json({ message: 'OK'});
});

app.get('/api/todo', (req, res, next) => {
  let sql = 'select * from todo';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({error: err.message });
    }

    return res.json({
      message: 'success',
      data: rows
    });
  })
})

app.post('/api/todo', (req, res, next) => {
  if (!req.body.description) {
    return res.status(400).json({ error: 'Missing description'})
  }

  let data = {
    description: req.body.description,
    status: 0
  }

  let sql = 'insert into todo (description, status) VALUES (?,?)';
  let params = [data.description, data.status];

  db.run(sql, params, function (err, resutl) {
    if (err) {
      return res.status(400).json({error: err.message });
    }

    return res.json({
      message: 'success',
      data: {
        id: this.lastID,
        description: data.description,
        status: data.status
      }
    })
  })
});
app.delete('/api/todo', (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'id needed' });
  }

  let sql = 'DELETE FROM todo where id = ?';
  let params = [+req.body.id];

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
    });
  });
});
app.patch('/api/todo', (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'id needed' });
  }
  if (!req.body.status) {
    return res.status(400).json({ error: 'status needed' });
  }

  let sql = 'UPDATE todo SET status = ? where id = ?';
  let params = [+req.body.status, +req.body.id];

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: {
        status: +req.body.status
      }
    });
  });
});
