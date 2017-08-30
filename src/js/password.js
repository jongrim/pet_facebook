function isLongEnough(password) {
  // checks for minimum of 8 characters
  return password.length > 7;
}

function hasNumbers(password) {
  // checks for two or more numbers
  return /([0-9]+?){2}/.test(password);
}

function passwordsMatch(password1, password2) {
  return password1 === password2;
}

export { isLongEnough, hasNumbers, passwordsMatch };
