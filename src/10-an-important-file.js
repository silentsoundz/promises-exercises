/*
## Task
We are going to demonstrate this to ourselves by creating a chain
of functions that all print to the console.

  * Create a function `alwaysThrows` that throws an `Error` withtext `"OH NOES"`;
  * Create a function `iterate` that prints the first argument(an integer) to it and then returns that argument + 1;
  * Create a promise chain that wraps your iterate method using Q's`fcall` then a series of iterations that attempts to perform `iterate`a total of 10 times.
  * Attach `console.log` as a rejection handler at the bottom of yourchain.
  * Insert a call to `alwaysThrows` after your 5th call of `iterate`

If you have done this correctly, your code should print 1,2,3,4,5,
"[Error: OH NOES]".  It's important to notice that the thrown exception was
turned into a rejected promise which caused the rejected promise to
travel down the promise chain to the first available rejection handler.

## Bonus

Try swapping your rejection handler from console.log to alwaysThrows.
Your program will now throw an exception in the global context!  Ahh!
Try to fix this using the approach described above.
*/
  function iterate (num) {
    console.log(num);
    return ++num;
  };

  function alwaysThrows() {
    throw new Error('OH NOES');
  };

  Promise.resolve(iterate(1))
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(alwaysThrows)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(null, console.log);