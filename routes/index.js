var express = require('express');
var router = express.Router();
const fs = require('fs');
const https = require('https');

var names = ["Hans", "Peter", "Fritz", "Hanspeter", "Fridolin", "karl marx", "Karl", "Marx", "warmus", "rammses", "gergages", "james", "haber", "asdf", "michi", "jannis", "carlos", "narcos", "pablo", "gaviria"]
var me = {
  "name": "Miguel",
  "age": 18,
  "adress": "Kelleramtstrasse 2, Arni AG 8905, Switzerland",
  "eye_color": "brown"
}

var books = [
    {
      isbn: "192837509842034927",
      title: "Ein Buch",
      year: 2023,
      author: "Schriftsteller"
    },
    {
      isbn: "1975092834052398527",
      title: "Ein zweites Buch",
      year: 2025,
      author: "Schriftsteller von der Zukunft"
    },
    {
      isbn: "1923749238797825427",
      title: "Ein Prequel",
      year: 1990,
      author: "Schriftsteller aus der Vergangenheit"
    }
  ]


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function (req, res, next) {
  res.send(JSON.stringify(books))
});

router.post('/books', function (req, res, next) {
  let book = req.body
  books.push(book)
  res.send(JSON.stringify(books))
});

router.get('/books/:isbn', function (req, res, next) {
  const isbn = req.params.isbn

  res.send(books.filter((book) => book.isbn === isbn)[0])
});

router.put('/books/:isbn', function (req, res, next) {
  const isbn = req.params.isbn

  books.splice(books.indexOf(books.filter((book) => book.isbn === isbn)), 1)
  let newBook = req.body
  books.push(newBook)

  res.send(books.filter((book) => book.isbn === newBook.isbn)[0])
});

router.delete('/books/:isbn', function (req, res, next) {
  const isbn = req.params.isbn
  books.splice(books.indexOf(books.filter((book) => book.isbn === isbn)), 1)

  res.send(JSON.stringify(books))
});






































router.get('/now', function (req, res, next) {
  // url with correct timezone of switzerland on localhosr:3000/now?timezone=Europe/Zurich

  // get timezone from request parameter
  var timeZone = req.query.timezone;
  // if no timezone is given, use UTC
  if (timeZone == undefined) {
    timeZone = "UTC";
  }
  // render index with current time
  res.render('time', {
    title: new Date().toLocaleString('de-CH', { timeZone: timeZone }),
    timezone: timeZone
  });
});

router.get('/zli', function (req, res, next) {
  res.redirect("https://moodle.zli.ch")
});

router.get('/name', function (req, res, next) {
  let random_name = Math.floor(Math.random() * names.length);

  res.send(
    `<!DOCTYPE html>
  <html>
  <head>
  <title>Name Input Form</title>
  </head>
  <body>
  <h1>Random Name: ${names[random_name]}</h1>
  <h2>Enter a name to add user:</h2>
  <form action="/name" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br><br>
  <input type="submit" value="Submit">
  </body>
  </html>
  `)
});

router.get('/names', function (req, res, next) {
  newNames = ""
  names.map(name => newNames += name + " | ")
  res.render('name', { title: newNames });
});

router.post('/name', function (req, res, next) {
  names.push(req.body.name);
  res.redirect("/name");
});

router.delete('/name', function (req, res, next) {

  let name_index = names.indexOf(req.query.name);
  console.log(req.body.name);
  console.log(name_index);

  if (name_index > -1) {
    names.splice(name_index, 1);
    res.sendStatus(204);
    res.redirect("/name");
    return
  } else {
    res.sendStatus(500);
  }
});

router.get('/html', function (req, res, next) {
  res.send(fs.readFileSync("./public/files/html.html", "utf8").toString());
});

router.get('/xml', function (req, res, next) {
  res.send(fs.readFileSync("./public/files/xml.xml", "utf8").toString());
});

router.get('/image', function (req, res, next) {
  res.sendFile("C:/pers_Workspace/zli-backend/public/images/400x400.jpg")
});

router.get('/teapot', function (req, res, next) {
  res.sendStatus(418);
});

router.get('/user-agent', function (req, res, next) {
  res.send(req.headers['user-agent']);
});

router.get('/secret', function (req, res, next) {
  res.sendStatus(403);
});

router.get('/secret2', function (req, res, next) {
  if (req.headers.authorization == "Basic dGVzdDoxMjM0") {
    res.send("You are logged in");
    return
  }
  res.sendStatus(401);
});

router.get('/chuck', function (req, res, next) {

  var name = req.query.name

  https.get('https://api.chucknorris.io/jokes/random', (resp) => {

    // A chunk of data has been recieved.
    resp.on('data', (data) => {
      res.send(JSON.parse(data).value.replace("Chuck Norris", name))
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })
});

router.get('/me', function (req, res, next) {
  res.send(me)
});

router.patch('/me', function (req, res, next) {
  for (key in me.keys()) {
    if (req.header.newValue[0] in me.keys()) {
      me[key] = [1]
    }
  }

  res.send(me)
});


module.exports = router;
