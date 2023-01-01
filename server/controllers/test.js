// Requiring module
const bcrypt = require("bcryptjs");

const password = "pass123";
var hashedPassword;

// Encryption of the string password
bcrypt.genSalt(10, function (err, Salt) {
  // The bcrypt is used for encrypting password.
  bcrypt.hash(password, Salt, function (err, hash) {
    if (err) {
    }

    hashedPassword = hash;

    bcrypt.compare(password, hashedPassword, async function (err, isMatch) {
      // Comparing the original password to
      // encrypted password
      if (isMatch) {
      }

      if (!isMatch) {
        // If password doesn't match the following
        // message will be sent
      }
    });
  });
});
