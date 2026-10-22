const resolvedPromise = Promise.resolve(3);
const rejectedPromise = Promise.reject("Boo!");

resolvedPromise.then(result => console.log(result));
rejectedPromise.catch(error => console.log(error));
