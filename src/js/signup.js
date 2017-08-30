import { isLongEnough, hasNumbers, passwordsMatch } from './password.js';

export default class Signup {
  constructor() {
    console.log('setting up Signup');
    // DOM cache
    this.$firstName = $('#firstName');
    this.$lastName = $('#lastName');
    this.$email = $('#email');
    this.$password = $('#password');
    this.$confirmPassword = $('#confirmPassword');
    this.$signupSubmit = $('#signupSubmit');

    [
      this.$firstName,
      this.$lastName,
      this.$email,
      this.$password,
      this.$confirmPassword
    ].forEach(el => {
      el.keyup(this.validateForm.bind(this));
    });
  }

  validatePasswords() {
    let matchMade = passwordsMatch(
      this.$password.val(),
      this.$confirmPassword.val()
    );
    if (!matchMade) return false;

    if (
      hasNumbers(this.$password.val()) &&
      isLongEnough(this.$password.val())
    ) {
      return true;
    } else {
      return false;
    }
  }

  validateForm() {
    if (
      this.$firstName.val() &&
      this.$lastName.val() &&
      this.$email.val() &&
      this.$password.val() &&
      this.$confirmPassword.val() &&
      this.validatePasswords()
    ) {
      this.$signupSubmit.removeAttr('disabled');
    } else {
      this.$signupSubmit.attr('disabled', true);
    }
  }
}
