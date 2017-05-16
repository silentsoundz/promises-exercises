// # Instructions
//
// 1. You'll do the same thing as the previous exercise(s), but now you should use asynquence.
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
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// request an array of files at once in "parallel"

getFile("file1")
.val(output)
.seq(getFile("file2") )
.val(output)
.seq(getFile("file3") )
.val(output)
.val(function(){
	output("Complete!");
});
