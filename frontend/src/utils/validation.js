// validation.js
export const validateFormData = (formData, setErrors) => {
  const newErrors = {};

  if (!formData.fullName || formData.fullName.trim().length < 2 || formData.fullName.trim().length > 50) {
    newErrors.fullName = 'Full Name is required (2-50 characters).';
  }

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    newErrors.email = 'Valid Email is required.';
  }

  const phoneRegex = /^\d{10}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    newErrors.phone = 'Phone Number is required and must be 10 digits.';
  }

  if (!formData.dob) {
    newErrors.dob = 'Date of Birth is required.';
  } else {
    const dobDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || (age === 18 && today < new Date(dobDate.setFullYear(dobDate.getFullYear() + 18)))) {
      newErrors.dob = 'User must be at least 18 years old.';
    }
  }

  if (!formData.gender) {
    newErrors.gender = 'Gender is required.';
  }

  if (!formData.address1 || formData.address1.trim().length > 100) {
    newErrors.address1 = 'Address Line 1 is required (max 100 characters).';
  }

  if (formData.address2 && formData.address2.length > 100) {
    newErrors.address2 = 'Address Line 2 max length is 100 characters.';
  }

  if (!formData.country) {
    newErrors.country = 'Country is required.';
  }

  if (!formData.state) {
    newErrors.state = 'State/Province is required.';
  }

  if (!formData.city) {
    newErrors.city = 'City is required.';
  }

  const zipRegex = /^[a-zA-Z0-9]{5,6}$/;
  if (!formData.zip || !zipRegex.test(formData.zip)) {
    newErrors.zip = 'Zip Code is required (5-6 alphanumeric characters).';
  }

  if (!formData.occupation) {
    newErrors.occupation = 'Occupation is required.';
  }

  if (formData.income && (isNaN(formData.income) || Number(formData.income) < 0)) {
    newErrors.income = 'Annual Income must be a positive number.';
  }

  if (!formData.signature) {
    newErrors.signature = 'Signature is required.';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
