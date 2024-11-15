function AdminValidationPackage(formData, isCreateModal) {
  const error = {};
  const nameWithAlphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)/; // Requires both letters and numbers
  const nameRegex = /^[\p{L}\s]+$/u;
  const spaceRegex = /^\s*$/;
  const descriptionRegex = /^.{10,100}$/;
  const codeRegex = /^[a-zA-Z]+$/;
  const accentRegex =
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũôồốộổỗơờớợởỡùúụủũàáạảãâầấậẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũ]/;

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  };

  if (isCreateModal) {
    if (formData.name !== undefined) {
      if (formData.name === "") {
        error.name = "Package name is required!";
      } else if (!nameWithAlphanumericRegex.test(formData.name)) {
        error.name = "Package name must include both letters and numbers!";
      }
    }

    if (formData.price !== undefined) {
      if (formData.price === "") {
        error.price = "Package price is required!";
      }
    }
  }

  if (formData.name !== undefined) {
    if (formData.name === "") {
      error.name = "Package name is required!";
    } else if (!nameWithAlphanumericRegex.test(formData.name)) {
      error.name = "Package name must include both letters and numbers!";
    }
  }

  if (formData.price !== undefined) {
    if (formData.price === "") {
      error.price = "Package price is required!";
    }
  }

  return error;
}

export default AdminValidationPackage;
