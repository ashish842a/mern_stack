// api.js
export async function submitUserForm(formData, setFormData, setStateOptions, setCityOptions, setErrors, setLoading) {
  setLoading(true);
  try {
    // Replace URL with your backend endpoint
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Failed to submit form');
    }

    alert('User registered successfully!');
    
    // Reset form or do other actions here
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      predictedAge: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      occupation: '',
      income: '',
      signature: '',
    });
    setStateOptions([]);
    setCityOptions([]);
    setErrors({});
  } catch (error) {
    alert('Error submitting form: ' + error.message);
  } finally {
    setLoading(false);
  }
}
