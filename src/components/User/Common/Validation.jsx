function Validation(inputValue) {
  const error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0[2|3|5|7|8|9])+([0-9]{8})$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (inputValue.firstName !== undefined) {
    if (inputValue.firstName === "") {
      error.firstName = "First name is required!";
    } else if (!nameRegex.test(inputValue.firstName)) {
      error.firstName =
        "First name cannot contain numbers or special characters!";
    }
  }

  if (inputValue.lastName !== undefined) {
    if (inputValue.lastName === "") {
      error.lastName = "Last name is required!";
    } else if (!nameRegex.test(inputValue.lastName)) {
      error.lastName =
        "Last name cannot contain numbers or special characters!";
    }
  }

  if (inputValue.dob !== undefined && inputValue.dob === "") {
    error.dob = "Date of Birth is required!";
  }

  if (inputValue.gender !== undefined && inputValue.gender === "") {
    error.gender = "Gender is required!";
  }

  if (inputValue.address !== undefined && inputValue.address === "") {
    error.address = "Address is required!";
  }

  if (inputValue.password !== undefined) {
    if (inputValue.password === "") {
      error.password = "Password is required!";
    } else if (!passwordRegex.test(inputValue.password)) {
      error.password =
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
    }
  }

  if (inputValue.retypePassword !== undefined) {
    if (inputValue.retypePassword === "") {
      error.retypePassword = "Retype password is required!";
    } else if (inputValue.retypePassword !== inputValue.password) {
      error.retypePassword = "Passwords do not match!";
    }
  }

  if (inputValue.email !== undefined) {
    if (inputValue.email === "") {
      error.email = "Email is required!";
    } else if (!emailRegex.test(inputValue.email)) {
      error.email = "Wrong email format (Ex: abc@gmail.com)";
    }
  }

  if (inputValue.phoneNumber !== undefined) {
    if (inputValue.phoneNumber === "") {
      error.phoneNumber = "Phone number is required!";
    } else if (!phoneRegex.test(inputValue.phoneNumber)) {
      error.phoneNumber = "Wrong phone number format (Ex: 0973232154)";
    }
  }

  if (inputValue.province !== undefined && inputValue.province === "") {
    error.province = "Province is required!";
  }

  if (inputValue.jobType !== undefined && inputValue.jobType === "") {
    error.jobType = "Job Type is required!";
  }

  if (inputValue.jobLevel !== undefined && inputValue.jobLevel === "") {
    error.jobLevel = "Job Level is required!";
  }

  if (inputValue.salary !== undefined && inputValue.salary === "") {
    error.salary = "Salary is required!";
  }

  if (inputValue.workType !== undefined && inputValue.workType === "") {
    error.workType = "Work Type is required!";
  }

  return error;
}

export default Validation;
