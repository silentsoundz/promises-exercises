const pg = require('pg-promise')()
const assert = require('assert')


const postgresConfig = {
  host: 'localhost',
  port: 5432,
  database: 'pg-promise-exercises',
  user: 'stephanimcgrath',
  // password: '' //  replace this if you have set a password for your username (this is unlikely)
};


const db = pg(postgresConfig);

/* -----------------------------------------
   Exercise 1
   -----------------------------------------

   This is an example function that finds all the books from the `books` table
   @function: `allBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

   The assertion fails, and you have to make it pass.

*/



  const allBooks = db.any('select * from books')
  allBooks.then(books => {
    return assert.deepEqual(books.length, 15)
  }).catch(error => {
    console.log('Dang, my assertion failed.', error);
  });

/* -----------------------------------------
           Exercise 2
   -----------------------------------------

   Implement the function `firstTenBooks` which returns just the names of the
   books, and make the assertion pass.
   @function: `firstTenBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]


*/

  let firstTenBooks = db.any('SELECT title FROM books LIMIT 10')
  firstTenBooks.then(books => {
    assert(books.length, 10)
  }).catch(error => {
    console.log('Whoops, my function doesnt behave as expected.', error);
  });



/* -----------------------------------------
            Exercise 3
   -----------------------------------------

   Implement the function `findAuthorsOrderedByLastName` which returns all the
   authors from the the `authors` table, and the rows are ordered by the
   `last_name`.


   @function: `findAuthorsOrderedByLastName`
   @input params: None
   @output: [{id, first_name, last_name}]


*/

  let findAuthorsOrderedByLastName = db.any('SELECT * FROM authors ORDER BY last_name')
  findAuthorsOrderedByLastName.then(authors => {
    assert.deepEqual(authors.length, 19)
    assert.deepEqual(authors[0].last_name, 'Alcott')
    assert.deepEqual(authors[18].last_name, 'Worsley')
  }).catch(error => {
    console.log('Whoops, my function doesnt behave as expected.', error);
  });

/* -----------------------------------------
   Exercise 4
   -----------------------------------------

   Implement the function `findBookAuthors` which returns the `first_name` and
   `last_name` from the `authors` table, and the `title` of the
   books(from the `books` table) that the authors have written.

   @function: `findBookAuthors`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [{first_name: 'John', last_name: 'Worsley', title: 'Practical PostgreSQL'}
   {first_name: 'Paulette', last_name: 'Bourgeois', title: 'Franklin in the Dark'}
   {first_name: 'Margery Williams', last_name: 'Bianco', title: 'The Velveteen Rabbit'}
   {first_name: 'Louisa May', last_name: 'Alcott', title: 'Little Women'}
   {first_name: 'Stephen', last_name: 'King', title: 'The Shining'}
   {first_name: 'Frank', last_name: 'Herbert', title: 'Dune'}
   {first_name: 'Burne', last_name: 'Hogarth', title: 'Dynamic Anatomy'}
   {first_name: 'Margaret Wise', last_name: 'Brown', title: 'Goodnight Moon'}
   {first_name: 'Edgar Allen', last_name: 'Poe', title: 'The Tell-Tale Heart'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Learning Python'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Programming Python'}
   {first_name: 'Tom', last_name: 'Christiansen', title: 'Perl Cookbook'}
   {first_name: 'Arthur C.', last_name: 'Clarke', title: '2001: A Space Odyssey'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'Bartholomew and the Oobleck'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'The Cat in the Hat'}]
*/
  let findBookAuthors = db.any('SELECT first_name, last_name, title FROM authors JOIN books ON authors.id = books.author_id')
  findBookAuthors.then(authors => {
    assert.deepEqual(authors[0].title, 'Practical PostgreSQL')
    assert.deepEqual(authors[0].first_name, 'John')
    assert.deepEqual(authors[0].last_name, 'Worsley')
  }).catch(error => {
    console.log('Whoops, my function doesnt behave as expected.', error);
  });



/* -----------------------------------------
   Exercise 5
   -----------------------------------------

   Implement the function `authorIdWithTwoBooks` which returns the
   `author_id` of authors who have 2 books. (HINT: you have to use a SUBQUERY)

   @function: `authorIdWithTwoBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{author_id: 1809},
      {author_id: 7805}]
*/

  let authorIdWithTwoBooks = db.any('SELECT author_id FROM books GROUP BY author_id HAVING ( COUNT(author_id) > 1 )')


    authorIdWithTwoBooks.then( books => {
     assert.deepEqual(books[0].author_id, '1809')
     assert.deepEqual(books[1].author_id, '7805')
    }).catch(error => {
      console.log('Whoops, my function doesnt behave as expected.', error);
    });


  /* -----------------------------------------
     Exercise 6
     -----------------------------------------

     Implement the function `bookTitlesWithMultipleEditions` which returns the
     `title` of books which have more than one entry in the editions table (do not use the "edition" field). (HINT: you have to use a join)

     @function: `bookTitlesWithMultipleEditions`
     @input params: None
     @output: [{title}]

     In this exercise you will ALSO have to write the assertions. For inspiration,
     look at the assertions in Exercises 1 - 3.

     Expected Result:
       [{title: 'The Shining'},
        {title: 'The Cat in the Hat'},
        {title: 'Dune'}
        {title: '2001: A Space Odyssey'}
        {title: 'The Tell-Tale Heart'}]

  */

  let bookTitlesWithMultipleEditions = db.any('SELECT title FROM books JOIN editions ON editions.book_id = books.id GROUP BY title Having COUNT(*) > 1')
    bookTitlesWithMultipleEditions.then(books => {
    assert.deepEqual(books[2].title, 'Dune')
    assert.deepEqual(books[0].title, 'The Shining')
    assert.deepEqual(books[4].title, 'The Tell-Tale Heart')
    }).catch(error => {
      console.log('Whoops, my function doesnt behave as expected.', error);
    });


  /* -----------------------------------------
     Exercise 7
     -----------------------------------------

     Implement the function `findStockedBooks` which returns the `title` & the
     author's `first_name` & `last_name` of all books which are stocked as
     represented in the `daily_inventory` table.

     @function: `findStockedBooks`
     @input params: None
     @output: [{first_name, last_name, title}]

     In this exercise you will ALSO have to write the assertions. For inspiration,
     look at the assertions in Exercises 1 - 3.

     Expected Result:
     [ {first_name: 'Frank',  title: 'Dune', last_name: 'Herbert'},
       {title: 'The Cat in the Hat', first_name: 'Theodor Seuss', last_name: 'Geisel'}]

  */
  let findStockedBooks = db.any('SELECT first_name, title, last_name FROM authors JOIN books ON authors.id = books.author_id JOIN editions ON editions.book_id = books.id JOIN daily_inventory ON daily_inventory.isbn = editions.isbn WHERE is_stocked = true')
    findStockedBooks.then(authors => {
     assert.deepEqual(authors[0].title, 'Dune')
     assert.deepEqual(authors[0].first_name, 'Frank')
     assert.deepEqual(authors[0].last_name, 'Herbert')
    }).catch(error => {
      console.log('Whoops, my function doesnt behave as expected.', error);
    });

pg.end();