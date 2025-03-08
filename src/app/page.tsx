"use client";

import { useEffect, useState, useCallback } from "react";
import { AdvocateData } from "./api/advocates/types";
import Footer from "./pagination/footer";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2; // Number of items per page

  const fetchAdvocates = useCallback(() => {
    fetch(`/api/advocates?page=${page}&limit=${limit}&term=${searchTerm}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setTotalPages(jsonResponse.totalPages);
      });
  }, [page, searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchAdvocates();
    }, 300); // Debounce API calls

    return () => clearTimeout(debounce);
  }, [fetchAdvocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <main className="m-6">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>

      {/* 🔹 Search Bar */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Search:</label>
        <input
          className="border p-2 w-full"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search advocates..."
        />
      </div>

      {/* 🔹 Advocate Table */}
      <table className="table-fixed w-full overflow-hidden mt-6 border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Degree</th>
            <th className="p-2 border">Specialties</th>
            <th className="p-2 border">Years of Experience</th>
            <th className="p-2 border">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.length > 0 ? (
            advocates.map((advocate) => <AdvocateRow key={advocate.id} advocate={advocate} />)
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 Pagination Footer */}
      <Footer page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}

// 🔹 Extracted AdvocateRow Component
const AdvocateRow = ({ advocate }: { advocate: AdvocateData }) => (
  <tr className="border">
    <td className="p-2 border">{advocate.firstName}</td>
    <td className="p-2 border">{advocate.lastName}</td>
    <td className="p-2 border">{advocate.city}</td>
    <td className="p-2 border">{advocate.degree}</td>
    <td className="p-2 border">
      <div className="relative group h-32 overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
        {advocate.specialties.map((s, index) => (
          <div key={index} className="bg-gray-100 p-1">
            {s}
          </div>
        ))}
      </div>
    </td>
    <td className="p-2 border">{advocate.yearsOfExperience}</td>
    <td className="p-2 border">{advocate.phoneNumber}</td>
  </tr>
);
