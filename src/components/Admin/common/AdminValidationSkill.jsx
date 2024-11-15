function AdminValidationSkill(formData, isCreateModal) {
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
    if (formData.name !== undefined) {
      if (formData.name === "") {
        error.name = "Skill name is required!";
      } else if (!nameRegex.test(formData.name)) {
        error.name = "Skill name cannot contain only numbers!";
      }
    }
  }

  if (formData.name !== undefined) {
    if (formData.name === "") {
      error.name = "Skill name is required!";
    } else if (!nameRegex.test(formData.name)) {
      error.name = "Skill name cannot contain only numbers!";
    }
  }

  return error;
}

export default AdminValidationSkill;
