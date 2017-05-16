// # Instructions
//
// 1. You'll do the same thing as the previous exercise(s), but now you should use map/reduce, promises, and an array of files.
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

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

["file1", "file2", "file3"]
.map(getFile)
.reduce(function combine(chain,pr){
	return chain.then(function(){
		return pr;
	}) .then(output);
}, Promise.resolve() )
.then(function(){
	output("Complete!");
});

Promise.resolve()

.then(function(){
	return p1;
}).then(output)

.then(function(){
	return p2;
}).then(output)

.then(function(){
	return p3;
})
.then(output)

