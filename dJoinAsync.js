const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const joiner = async () => {
  let output = [];

  const users = JSON.parse(await readFileAsync('users.json'));
  const books = JSON.parse(await readFileAsync('books.json'));
  const reviews = JSON.parse(await readFileAsync('reviews.json'));

  for ( let singleReview of reviews ) {
    for ( let singleBook of books ) {
      for ( let singleUser of users ) {
        if ( singleReview.userId === singleUser.id &&
             singleReview.bookId === singleBook.id ) {
          let joined = {
            "name":singleUser.firstName,
            "book":singleBook.title,
            "rating":singleReview.stars,
            "review":singleReview.text
          }
          output.push(joined);
        }
      }
    }
  }

  return output;
};

module.exports = joiner;
