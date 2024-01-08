// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt user for the desired password length
  var length = parseInt(prompt("How many characters? Must be at least 8"));

  // Validate the password length input
  if (length < 8 || length > 128 || isNaN(length)) {
    alert("Password length must be between 8 and 128 characters.");
    return null; // Return null if input is invalid
  }

  // Prompt user for character types to include in the password
  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  // Ensure at least one character type is selected
  if (
    !(includeLowercase || includeUppercase || includeNumeric || includeSpecial)
  ) {
    alert("At least one character type must be selected.");
    return null; // Return null if no character type is selected
  }

  // Return an object containing the selected options
  return {
    length: length,
    lower: includeLowercase,
    upper: includeUppercase,
    number: includeNumeric,
    special: includeSpecial,
  };
}

function getRandomElementFromArray(arr, length, preselectedCharacter) {
  var finalPassword = preselectedCharacter;
  console.log(preselectedCharacter);
  var preselectedCharacterLength = preselectedCharacter.length;

  for (let index = 0; index < length - preselectedCharacterLength; index++) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var randomCharacter = arr[randomIndex];
    console.log(randomCharacter);
    finalPassword += randomCharacter;
  }
  return finalPassword;
}

// Function to generate a random password based on user options
function generatePassword() {
  // Get user-selected options for the password
  var allCharacters = [];

  // Initialize arrays and variables to store characters and preselected characters
  const result = getPasswordOptions();
  var preselectedCharacter = "";

  if (!result) return; // Return if options are null (indicating invalid input)

  // Based on user options, add characters to the character pool and preselect at least one character
  if (result.lower) {
    const randomIndex = Math.floor(Math.random() * lowerCasedCharacters.length);
    const randomCharacter = lowerCasedCharacters[randomIndex];
    preselectedCharacter += randomCharacter;
    allCharacters = allCharacters.concat(lowerCasedCharacters);
  }
  if (result.upper) {
    const randomIndex = Math.floor(Math.random() * upperCasedCharacters.length);
    const randomCharacter = upperCasedCharacters[randomIndex];
    preselectedCharacter += randomCharacter;
    allCharacters = allCharacters.concat(upperCasedCharacters);
  }
  if (result.number) {
    const randomIndex = Math.floor(Math.random() * numericCharacters.length);
    const randomCharacter = numericCharacters[randomIndex];
    preselectedCharacter += randomCharacter;
    allCharacters = allCharacters.concat(numericCharacters);
  }
  if (result.special) {
    const randomIndex = Math.floor(Math.random() * specialCharacters.length);
    const randomCharacter = specialCharacters[randomIndex];
    preselectedCharacter += randomCharacter;
    allCharacters = allCharacters.concat(specialCharacters);
  }

  // Generate the password by combining preselected characters with random characters from the pool
  return getRandomElementFromArray(
    allCharacters,
    result.length,
    preselectedCharacter
  );
}

// Button element to trigger password generation
var generateBtn = document.querySelector("#generate");

// Function to write the generated password to the page
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  // Update the password text field if a valid password is generated
  if (password) {
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
