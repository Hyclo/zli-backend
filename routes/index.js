var express = require('express');
var router = express.Router();
const {resolve} = require('path');

const absolutePath = resolve('./public/files/swagger-output.json');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index', { title: 'Express' });
});

router.get('/swagger', function(req,res, next) {
   res.sendFile(absolutePath)
});

/*
const fs = require('fs');
const session = require('express-session');

var names = [
   'Hans',
   'Peter',
   'Fritz',
   'Hanspeter',
   'Fridolin',
   'karl marx',
   'Karl',
   'Marx',
   'warmus',
   'rammses',
   'gergages',
   'james',
   'haber',
   'asdf',
   'michi',
   'jannis',
   'carlos',
   'narcos',
   'pablo',
   'gaviria',
];

var me = {
   name: 'Miguel',
   age: 18,
   adress: 'Kelleramtstrasse 2, Arni AG 8905, Switzerland',
   eye_color: 'brown',
};
*/
var books = [
   {
      isbn: '192837509842034927',
      title: 'Ein Buch',
      year: 2023,
      author: 'Schriftsteller',
   },
   {
      isbn: '1975092834052398527',
      title: 'Ein zweites Buch',
      year: 2025,
      author: 'Schriftsteller von der Zukunft',
   },
   {
      isbn: '1923749238797825427',
      title: 'Ein Prequel',
      year: 1990,
      author: 'Schriftsteller aus der Vergangenheit',
   },
   {
      isbn: '192374923879782',
      title: 'Ein Buch',
      year: 1856,
      author: 'Schriftsteller',
   },
];

var lends = [
   {
      id: 1,
      customer_id: 1,
      isbn: '192837509842034927',
      borrowed_at: '2021-03-01',
      returned_at: '2021-03-08',
   },
   {
      id: 2,
      customer_id: 2,
      isbn: '1975092834052398527',
      borrowed_at: '2021-03-01',
      returned_at: '2021-03-08',
   },
   {
      id: 3,
      customer_id: 3,
      isbn: '1923749238797825427',
      borrowed_at: '2021-03-01',
      returned_at: '2021-03-08',
   },
   {
      id: 4,
      customer_id: 4,
      isbn: '192374923879782',
      borrowed_at: '2021-03-01',
      returned_at: '2021-03-08',
   },
];


router.get('/books', function (req, res, next) {
   res.send(JSON.stringify(books));
});

router.post('/books', function (req, res, next) {
   let book = req.body;
   books.push(book);
   res.send(JSON.stringify(books));
});

router.get('/books/:isbn', function (req, res, next) {
   const isbn = req.params.isbn;

   res.send(books.filter((book) => book.isbn === isbn)[0]);
});

router.put('/books/:isbn', function (req, res, next) {
   const isbn = req.params.isbn;

   books.splice(books.indexOf(books.filter((book) => book.isbn === isbn)), 1);
   let newBook = req.body;
   books.push(newBook);

   res.send(books.filter((book) => book.isbn === newBook.isbn)[0]);
});

router.delete('/books/:isbn', function (req, res, next) {
   const isbn = req.params.isbn;
   books.splice(books.indexOf(books.filter((book) => book.isbn === isbn)), 1);

   res.send(JSON.stringify(books));
});

router.get('/lends', function (req, res, next) {
   res.send(JSON.stringify(lends));
});

router.post('/lends', function (req, res, next) {
   let lend = req.body;
   if (lends.filter((current) => current.isbn == lend.isbn)[0]) {
      res.send('Book is already lent');
      return;
   } else if (
      lends.filter((current) => current.customer_id == lend.customer_id)[0]
   ) {
      res.send('Customer already lent a book');
      return;
   } else if (!books.filter((current) => current.isbn == lend.isbn)[0]) {
      res.send('Book does not exist');
      return;
   } else if (
      !lend.isbn ||
      !lend.customer_id ||
      !lend.borrowed_at ||
      !lend.returned_at
   ) {
      res.send('Missing parameters');
      return;
   } else if (lend.borrowed_at > lend.returned_at) {
      res.send('Borrowed date is after returned date');
      return;
   }

   lends.push(lend);
   res.send(JSON.stringify(lends));
});

router.get('/lends/:id', function (req, res, next) {
   const id = req.params.id;

   res.send(lends.filter((lend) => lend.id == id)[0]);
});

router.patch('/lends/:id', function (req, res, next) {
   const newLend = req.body;
   const id = req.params.id;

   let oldLend = lends.filter((lend) => lend.id == id)[0];

   for (const [key, value] of Object.entries(newLend)) {
      oldLend[key] = value;
   }

   res.send(oldLend);
});

router.post('/name', function (req, res, next) {
   let myName = req.query.name;

   if (myName == undefined) {
      res.sendStatus(400);
   } else {
      res.cookie("I'm a Cookie", {
         name: myName,
         maxAge: 4000,
         expires: new Date(Date.now() + 4000),
         httpOnly: true,
      });
      res.send('Cookie set');
   }
});

router.get('/name', function (req, res, next) {
   let cookies = req.cookies;

   if (cookies["I'm a Cookie"]) {
      res.send(cookies["I'm a Cookie"].name);
   } else {
      res.send('No Cookie');
   }
});

router.delete('/name', function (req, res, next) {
   res.clearCookie("I'm a Cookie");
   res.send('Cookie deleted');
});

router.post('/login', function (req, res, next) {
   let user = req.body;

   if (user.email == 'desk@library.com' && user.password == 'SuPeRsTrOnGpAsSwOrD') {
      res.cookie("I'm a Cookie", {
         username: user.password,
         email: user.email,
         httpOnly: true,
      });

      res.status(201).send('Cookie set');
   } else {
      res.status(401).send('Wrong credentials');
   }
});

router.delete('/logout', function (req, res, next) {
   let cookies = req.cookies;

   if (cookies["I'm a Cookie"]) {
      res.clearCookie("I'm a Cookie");
      res.status(204).send('Cookie deleted');
   } else {
      res.status(401).send('No Cookie');
   }
});

router.get('/verify', function (req, res, next) {
   let cookies = req.cookies;

   if (cookies["I'm a Cookie"]) {
      res.status(200).send(cookies["I'm a Cookie"].email);
   } else {
      res.status(401).send('No Cookie');
   }
});

/*
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
*/

module.exports = router;
