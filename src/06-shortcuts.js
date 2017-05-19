/*
## Task

We don’t have any specific task we’d like to assign to you for this lesson.
Feel free to explore all three functions at your own pace. When you are
preparing to submit though, make sure you are using at least catch and one
of Promise.resolve and Promise.reject ☺
*/
  var promise = new Promise(function (fulfill, reject) {
    reject(new Error)
  })
      promise.catch(function (err) {
      console.error('THERE IS AN ERROR!!!');
      console.error(err.message);
    })



  var promise = Promise.resolve('THIS SHIT IS EASY PEASY');
  console.resolve(resolve.message);


  var promise = new Promise(function (fulfill, reject) {

   var promise = new Promise.reject(new Error('MAYBE THIS IS HARDER THAN I THOUGHT'));
   console.reject(error.message);

