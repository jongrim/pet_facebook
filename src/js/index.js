import 'bootstrap';
import Signup from './signup.js';
import Feed from './feed.js';
import Photo from './photo.js';

function runPageScripts(location) {
  let pathname = location.pathname;

  switch (pathname) {
    case '/signup':
      new Signup();
      break;
    case '/feed':
      new Feed();
      break;
    case '/photos':
      new Photo();
      break;
    default:
      break;
  }
}

$(document).ready(() => {
  runPageScripts(location);
});
