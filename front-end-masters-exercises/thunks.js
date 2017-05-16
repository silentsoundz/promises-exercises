// # Instructions
//
// 1. You'll do the same thing as the previous exercise(s), but now you should use thunks.
//
// 2. Expected behavior:
// 	- Request all 3 files at the same time (in "parallel").
// 	- Render them ASAP (don't just blindly wait for all to finish loading)
// 	- BUT, render them in proper (obvious) order: "file1", "file2", "file3".
// 	- After all 3 are done, output "Complete!".

function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
  var text, fn;

	fakeAjax(file,function(response) {
    if (fn) fn(response);
    else text = response;
  });

  return function(cb){
    if(text) cb(text);
    else fn = cb;
  };
}
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(function(text1){
  output(text1);
  th2(function(text2){
    output(text2);
    th3(function(text3){
      output(text3);
      output("Completed!");
    })
  });
});
