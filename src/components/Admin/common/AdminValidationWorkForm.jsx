function AdminValidationWorkForm(formData, isCreateModal) {
  const error = {};
  const nameRegex = /^[\p{L}\s]+$/u;
  const spaceRegex = /^\s*$/; // Regular expression to check for spaces only
  const descriptionRegex = /^.{10,100}$/;
  const codeRegex = /^[a-zA-Z]+$/;
  const accentRegex =
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũôồốộổỗơờớợởỡùúụủũàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũ]/;

  // Function to remove accents and spaces
  const removeAccents = (str) => {
    return str
      .normalize("NFD") // Normalize to decomposed form (e.g., "Bất" becomes "B" and "ạ")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/\s+/g, "") // Remove spaces
      .toLowerCase(); // Convert to lowercase
  };

  if (isCreateModal) {
    if (formData.value !== undefined) {
      if (formData.value === "") {
        error.value = "Type of work is required!";
      } else if (!nameRegex.test(formData.value)) {
        error.value = "Type of work cannot contain only numbers!";
      }
      //  else if (spaceRegex.test(formData.value)) {
      //   error.value = "Job Type cannot be empty or contain only spaces!";
      // }
      else if (!accentRegex.test(formData.value)) {
        error.value =
          "Type of work must include at least one accented character!";
      }

      if (formData.code === "") {
        error.code = "Type of work code is required!";
      } else if (!codeRegex.test(formData.code)) {
        error.code =
          "Type of work code can only contain letters (no numbers or spaces)!";
      }
    }
  }

  if (formData.name !== undefined) {
    if (formData.value === "") {
      error.value = "Type of work is required!";
    } else if (!nameRegex.test(formData.value)) {
      error.value = "Type of work cannot contain only numbers!";
    }
    //  else if (spaceRegex.test(formData.value)) {
    //   error.value = "Job Type cannot be empty or contain only spaces!";
    // }
    else if (!accentRegex.test(formData.value)) {
      error.value =
        "Type of work must include at least one accented character!";
    }
  }

  return error;
}

export default AdminValidationWorkForm;
