function AdminValidation(formData, isCreateModal) {
  const error = {};
  const nameRegex = /^[\p{L}\s]+$/u;
  const spaceRegex = /^\s*$/; // Regular expression to check for spaces only
  const descriptionRegex = /^.{10,100}$/;

  // Function to remove accents and spaces
  const removeAccents = (str) => {
    return str
      .normalize("NFD") // Normalize to decomposed form (e.g., "Bất" becomes "B" and "ạ")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/\s+/g, "") // Remove spaces
      .toLowerCase(); // Convert to lowercase
  };

  if (isCreateModal) {
    if (formData.code !== undefined) {
      if (formData.code === "") {
        error.code = "Job Code is required!";
      } else if (!nameRegex.test(formData.code)) {
        error.code = "Job Code cannot contain only numbers!";
      } else if (spaceRegex.test(formData.code)) {
        error.code = "Job Code cannot be empty or contain only spaces!";
      } else {
        // Remove accents and spaces, then check if the transformed value matches the original input
        const normalizedCode = removeAccents(formData.code);
        if (formData.code !== normalizedCode) {
          error.code =
            "Job Code cannot contain accents or spaces. Please use only lowercase letters and numbers.";
        }
      }

      if (formData.value === "") {
        error.value = "Job Type is required!";
      } else if (!nameRegex.test(formData.value)) {
        error.value = "Job Type cannot contain only numbers!";
      } else if (spaceRegex.test(formData.value)) {
        error.value = "Job Type cannot be empty or contain only spaces!";
      } else if (!descriptionRegex.test(formData.value)) {
        error.value = "Job Type must be between 10 and 100 characters.";
      }
    }

    if (formData.name !== undefined) {
      if (formData.name === "") {
        error.name = "Skill name is required!";
      } else if (!nameRegex.test(formData.name)) {
        error.name = "Skill name cannot contain only numbers!";
      } else if (spaceRegex.test(formData.name)) {
        error.name = "Skill name cannot be empty or contain only spaces!";
      } else {
        // Remove accents and spaces, then check if the transformed value matches the original input
        const normalizedCode = removeAccents(formData.name);
        if (formData.name !== normalizedCode) {
          error.name =
            "Skill name cannot contain accents or spaces. Please use only lowercase letters and numbers.";
        }
      }
    }
  }

  if (formData.value !== undefined) {
    if (formData.value === "") {
      error.value = "Job Type is required!";
    } else if (!nameRegex.test(formData.value)) {
      error.value = "Job Type cannot contain only numbers!";
    } else if (spaceRegex.test(formData.value)) {
      error.value = "Job Type cannot be empty or contain only spaces!";
    } else if (!descriptionRegex.test(formData.value)) {
      error.value = "Job Type must be between 10 and 100 characters.";
    }
  }

  return error;
}

export default AdminValidation;
