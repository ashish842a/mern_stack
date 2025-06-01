// File: frontend/src/pages/UserForm.jsx
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {countryStateCityData} from '../data/country';
import { fetchPredictedAge } from '../utils/fetchage'; // Import the age prediction function
import { validateFormData } from '../utils/validation'; // Import the validation function
import { submitUserForm } from '../utils/submitHandler';

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
    const sigCanvasRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // If fullName changes, call age prediction API
    if (name === 'fullName' && value.trim().length >= 2) {
      fetchPredictedAge(value.trim(),setFormData);
    }
  };

  // Fetch predicted age from external API
  

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
   const handleSignatureSave = () => {
    if (sigCanvasRef.current.isEmpty()) {
      setErrors({ signature: 'Signature is required.' });
      setFormData({ ...formData, signature: '' });
    } else {
      const signatureDataUrl = sigCanvasRef.current.toDataURL();
      setFormData({ ...formData, signature: signatureDataUrl });
      setErrors({ ...errors, signature: '' });
    }
  };
   const clearSignature = () => {
    sigCanvasRef.current.clear();
    setFormData({ ...formData, signature: '' });
    setErrors({ ...errors, signature: 'Signature is required.' });
  };


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFormData(formData, setErrors);

    if (!isValid) {
      return;
    }

    setLoading(true);

   await submitUserForm(formData, setFormData, setStateOptions, setCityOptions, setErrors, setLoading);
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
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        canvasProps={{ className: 'border border-gray-300 rounded', width: 300, height: 100 }}
        onEnd={handleSignatureSave}
      />
      {formData.signature && (
        <img
          src={formData.signature}
          alt="User Signature"
          className="mt-2 border border-gray-300"
          style={{ width: '300px', height: '100px' }}
        />
      )}
      {errors.signature && (
        <p className="text-red-600 text-sm mt-1">{errors.signature}</p>
      )}
      <button
        type="button"
        onClick={clearSignature}
        className="mt-2 px-3 py-1 border rounded bg-red-100 text-red-700 hover:bg-red-200"
      >
        Clear Signature
      </button>
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
