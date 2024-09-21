function Validation(inputValue) {
  const error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation regex (for a 10-digit number)
  const phoneRegex = /^(0[2|3|5|7|8|9])+([0-9]{8})$/;

  if (inputValue.firstName === "") {
    error.firstName = "First name is required!";
  }
  if (inputValue.lastName === "") {
    error.lastName = "Last name is required!";
  }
  if (inputValue.address === "") {
    error.address = "Address is required!";
  }

  if (inputValue.password === "") {
    error.password = "Password is required!";
  }

  if (inputValue.email === "") {
    error.email = "Email is required!";
  } else if (!emailRegex.test(inputValue.email)) {
    error.email = "Wrong email format (Ex: abc@gmail.com)";
  }

  if (inputValue.phoneNumber === "") {
    error.phoneNumber = "Phone number is required!";
  } else if (!phoneRegex.test(inputValue.phoneNumber)) {
    error.phoneNumber = "Wrong phone number format (Ex: 0973232154)";
  }

  return error;
}

export default Validation;
