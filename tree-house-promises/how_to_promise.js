var calculationPromise = new Promise(function(resolve, reject){
  setTimeout(function(){
	 resolve(1 + 1);
  }, 1000);
});

var calculationPromise2 = new Promise(function(resolve, reject){
  setTimeout(function(){
	 resolve(1 + 2);
  }, 500);
});
function addTwo(value){
  return value + 2;
}

function printFinalValue(nextValue){
  console.log("the final value is", nextValue);
}



 calculationPromise
  .then(addTwo)
  .then(addTwo)
  .then(printFinalValue);