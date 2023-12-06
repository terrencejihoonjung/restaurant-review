function validateRegisterInput(
  username: string,
  email: string,
  password: string
) {
  // Check if any fields are empty in the input
  if (username === "" || email === "" || password === "") {
    throw new Error("Please fill in empty fields");
  }

  // Email Validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  // Password Validation
  if (password.length < 5) {
    throw new Error("Password must be at least 5 characters long.");
  }
}

export default validateRegisterInput;
