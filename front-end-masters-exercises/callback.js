//# Instructions
// 1. This exercise calls for you to write some async flow-control code. To start off with, you'll use callbacks only.
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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		handleResponse(file,text);
	});
}

function handleResponse(filename, contents) {
  if (!(filename in responses)) {
    responses[filename] = contents;
 }
  var filenames = ["file1", "file2", "file3"];
  for (var i = 0; i < filenames.length; i++) {
    if (filenames[i] in responses) {
      if (typeof responses[filenames[i]] == "string") {
        output(responses[filenames[i]]);
        responses[filenames[i]] = false;
      }
    }
    else {
      return;
    }
  }

  output("Complete!");

}

var responses = {};

getFile("file1");
getFile("file2");
getFile("file3");