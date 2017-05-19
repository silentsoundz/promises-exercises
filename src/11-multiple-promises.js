/*
## Task

Let’s build this function!

Create a function all that accepts two promises as arguments. This all
function should do all of the following:

Create an internal promise in whatever way you see fit.

Create a counter variable with initial value of 0.

Attach then fulfillment handlers to both promises and increment the internal
counter when the handlers are called.

When the counter reaches 2, fulfill the internal promise with an array
containing both values.

Finally return that internal promise to the user.

After you finish writing your all function, pass getPromise1() and
getPromise2() into your new function and then attach console.log as a
fulfillment handler to the promise returned by your function. These two
promise-returning functions will be provided to you in the global scope.

*/

function all(a, b) {
  return new Promise(function (fulfill, reject) {
    var counter = 0;
    var out = [];

    a.then(function (val) {
      out[0] = val;
      counter ++;

      if (counter >= 2) {
        fulfill(out);
      }
    })
    b.then(function (val) {
      out[1] = val;
      counter ++;

      if(counter >=2) {
        fulfill(out);
      }
    });
  });
}

all(getPromise1(), getPromise2())
.then(console.log);