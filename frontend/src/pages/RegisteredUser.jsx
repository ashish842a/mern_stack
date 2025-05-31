import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from your backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users'); // Adjust the URL if needed
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Registered Users", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);

    // Define table column titles
    const headers = ["Full Name", "Age", "Email", "Phone", "Country", "State", "City", "Occupation"];

    // Start y position for table content
    let y = 30;

    // Print headers
    headers.forEach((header, i) => {
      doc.text(header, 14 + i * 25, y);
    });

    y += 10;

    // Print user rows
    users.forEach(user => {
      const row = [
        user.fullName || '',
        user.age ? user.age.toString() : '',
        user.email || '',
        user.phone || '',
        user.country || '',
        user.state || '',
        user.city || '',
        user.occupation || '',
      ];

      row.forEach((text, i) => {
        doc.text(text, 14 + i * 25, y);
      });

      y += 10;

      // Add new page if overflow
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("registered_users.pdf");
  };

  if (loading) return <p className="text-center mt-8">Loading users...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  if (users.length === 0)
    return <p className="text-center mt-8">No registered users found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Registered Users</h1>

      <button
        onClick={downloadPDF}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download All Users as PDF
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Full Name</th>
              <th className="border px-4 py-2 text-left">Age</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Country</th>
              <th className="border px-4 py-2 text-left">State</th>
              <th className="border px-4 py-2 text-left">City</th>
              <th className="border px-4 py-2 text-left">Occupation</th>
              <th className="border px-4 py-2 text-left">Signature</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.country}</td>
                <td className="border px-4 py-2">{user.state}</td>
                <td className="border px-4 py-2">{user.city}</td>
                <td className="border px-4 py-2">{user.occupation}</td>
                <td className="border px-4 py-2">
                  {user.signature ? (
                    <img
                      src={user.signature}
                      alt="Signature"
                      className="h-12 w-28 object-contain"
                    />
                  ) : (
                    'No Signature'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredUsers;
