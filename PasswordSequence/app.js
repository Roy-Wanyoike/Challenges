// let password = /^(?=.*\s)/;
// let isWhitespace = /^(?=.*\s)/;
// isWhitespace.test(" Roy"); //has a whitespace
// isWhitespace.test("Roy "); //Has a whitespace at the end
// isWhitespace.test("Roy Wanyoike"); //has a whitespace center
// isWhitespace.test("RoyWanyoike"); //No whitespace

// // to check any matching pattern or whitespace
// "Roy Wanyoike".match(pattern); //Roy Wanyoike
// // let pattern = /(?=.*[A-Z])/; 
// let pattern = /^*(?=\s[A-Z]).*$/;//has uppercase

//Program to check password length and must have several conditions to be considered secure. 
 /*
    * @params {string} : value : passwordValue
    */
 let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
 function checkPasswordValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
      return "Password must not contain Whitespaces.";
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }


    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }


    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 10-16 Characters Long.";
    }
  }
  return null;
    
    
    //------------usage/test----------
    const password1 = "weakPassword";
    const password2 = "StrongPass@3r55";
    
    
    console.log(checkPasswordValidation(password1));  //Password must contain at least one Digit.
    console.log(checkPasswordValidation(password2));  //null
