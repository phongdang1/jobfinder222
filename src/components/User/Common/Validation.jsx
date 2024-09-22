function Validation(inputValue) {
  const error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0[2|3|5|7|8|9])+([0-9]{8})$/;

  // Validate first name if it exists
  if (inputValue.firstName !== undefined && inputValue.firstName === "") {
    error.firstName = "First name is required!";
  }

  // Validate last name if it exists
  if (inputValue.lastName !== undefined && inputValue.lastName === "") {
    error.lastName = "Last name is required!";
  }

  // Validate address if it exists
  if (inputValue.address !== undefined && inputValue.address === "") {
    error.address = "Address is required!";
  }

  // Validate password if it exists
  if (inputValue.password !== undefined && inputValue.password === "") {
    error.password = "Password is required!";
  }

  // Validate retype password if it exists
  if (inputValue.retypePassword !== undefined) {
    if (inputValue.retypePassword === "") {
      error.retypePassword = "Retype password is required!";
    } else if (inputValue.retypePassword !== inputValue.password) {
      error.retypePassword = "Passwords do not match!";
    }
  }

  // Validate email if it exists
  if (inputValue.email !== undefined) {
    if (inputValue.email === "") {
      error.email = "Email is required!";
    } else if (!emailRegex.test(inputValue.email)) {
      error.email = "Wrong email format (Ex: abc@gmail.com)";
    }
  }

  // Validate phone number if it exists
  if (inputValue.phoneNumber !== undefined) {
    if (inputValue.phoneNumber === "") {
      error.phoneNumber = "Phone number is required!";
    } else if (!phoneRegex.test(inputValue.phoneNumber)) {
      error.phoneNumber = "Wrong phone number format (Ex: 0973232154)";
    }
  }

  return error;
}

export default Validation;
