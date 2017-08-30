import 'bootstrap';
import Signup from './signup.js';

function runPageScripts(location) {
  let pathname = location.pathname;

  switch (pathname) {
    case '/signup':
      new Signup();
      break;
    default:
      console.log('no matching path');
  }
}

$(document).ready(() => {
  console.log(location);
  runPageScripts(location);
});
