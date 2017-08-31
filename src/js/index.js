import 'bootstrap';
import Signup from './signup.js';
import Feed from './feed.js';

function runPageScripts(location) {
  let pathname = location.pathname;

  switch (pathname) {
    case '/signup':
      new Signup();
      break;
    case '/feed':
      new Feed();
      break;
    default:
      console.log('no matching path');
  }
}

$(document).ready(() => {
  runPageScripts(location);
});
