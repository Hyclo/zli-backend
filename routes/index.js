var express = require('express');
var router = express.Router();
const { resolve } = require('path');

const absolutePath = resolve('./public/files/swagger-output.json');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index', { title: 'Express' });
});

router.get('/swagger', function (req, res, next) {
   res.sendFile(absolutePath);
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

   if (
      user.email == 'desk@library.com' &&
      user.password == 'SuPeRsTrOnGpAsSwOrD'
   ) {
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

module.exports = router;
