// File: frontend/src/pages/UserForm.jsx
import React, { useState, useEffect } from 'react';

const countryStateCityData = {
  USA: {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Austin', 'Dallas'],
    'New York': ['New York City', 'Buffalo', 'Rochester'],
  },
  India: {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    Delhi: ['New Delhi', 'Noida', 'Gurgaon'],
  },
  Canada: {
    Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
    Quebec: ['Montreal', 'Quebec City', 'Laval'],
    'British Columbia': ['Vancouver', 'Victoria', 'Kelowna'],
  },
};

// Dummy SignatureCanvas - replace with a real signature capture library
const SignatureCanvas = ({ onSave }) => {
  const handleFakeSave = () => {
    const fakeImageData = 'data:image/png;base64,iVBORw0...'; // dummy base64 image
    onSave(fakeImageData);
  };
  return <button type="button" onClick={handleFakeSave}>Draw Signature</button>;
};

const UserForm = () => {
  const [formData, setFormData] = useState({
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

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // If fullName changes, call age prediction API
    if (name === 'fullName' && value.trim().length >= 2) {
      fetchPredictedAge(value.trim());
    }
  };

  // Fetch predicted age from external API
  const fetchPredictedAge = async (name) => {
    try {
      const res = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.age) {
        setFormData((prev) => ({ ...prev, predictedAge: data.age.toString() }));
      } else {
        setFormData((prev) => ({ ...prev, predictedAge: '' }));
      }
    } catch (err) {
      setFormData((prev) => ({ ...prev, predictedAge: '' }));
    }
  };

  // Handle country change: reset state and city, update states dropdown
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const states = countryStateCityData[selectedCountry]
      ? Object.keys(countryStateCityData[selectedCountry])
      : [];

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      state: '',
      city: '',
    }));

    setStateOptions(states);
    setCityOptions([]);
  };

  // Handle state change: reset city, update cities dropdown
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const cities =
      countryStateCityData[formData.country] &&
      countryStateCityData[formData.country][selectedState]
        ? countryStateCityData[formData.country][selectedState]
        : [];

    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: '',
    }));

    setCityOptions(cities);
  };

  // Handle signature save from SignatureCanvas
  const handleSignatureSave = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      signature: imageData,
    }));
  };

  // Validation function
  const validate = () => {
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">User Registration Form</h1>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter full name"
          />
          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="phone">Phone Number *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="dob">Date of Birth *</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* Predicted Age (readonly) */}
        {formData.predictedAge && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Predicted Age</label>
            <input
              type="text"
              readOnly
              value={formData.predictedAge}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
        )}

        {/* Address Line 1 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="address1">Address Line 1 *</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Street address, P.O. box, company name, c/o"
          />
          {errors.address1 && <p className="text-red-600 text-sm mt-1">{errors.address1}</p>}
        </div>

        {/* Address Line 2 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="address2">Address Line 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
          {errors.address2 && <p className="text-red-600 text-sm mt-1">{errors.address2}</p>}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Country</option>
            {Object.keys(countryStateCityData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="state">State/Province *</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            className="w-full border px-3 py-2 rounded"
            disabled={!stateOptions.length}
          >
            <option value="">Select State</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="city">City *</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={!cityOptions.length}
          >
            <option value="">Select City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Zip Code */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="zip">Zip Code *</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter zip or postal code"
          />
          {errors.zip && <p className="text-red-600 text-sm mt-1">{errors.zip}</p>}
        </div>

        {/* Occupation */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="occupation">Occupation *</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter occupation"
          />
          {errors.occupation && <p className="text-red-600 text-sm mt-1">{errors.occupation}</p>}
        </div>

        {/* Annual Income */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="income">Annual Income</label>
          <input
            type="number"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter annual income"
            min="0"
          />
          {errors.income && <p className="text-red-600 text-sm mt-1">{errors.income}</p>}
        </div>

        {/* Signature */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Signature *</label>
          <SignatureCanvas onSave={handleSignatureSave} />
          {formData.signature && (
            <img
              src={formData.signature}
              alt="User Signature"
              className="mt-2 border border-gray-300"
              style={{ width: '300px', height: '100px' }}
            />
          )}
          {errors.signature && <p className="text-red-600 text-sm mt-1">{errors.signature}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
