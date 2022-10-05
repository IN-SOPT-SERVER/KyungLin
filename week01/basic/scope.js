// var -> function scope
// let, const -> block scope

if (true) {
  var x = 'test1';
}
console.log(x);

if (true) {
  let y = 'test2';
}
console.log(y);