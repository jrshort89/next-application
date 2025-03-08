"use client";

import { useEffect, useState } from "react";
import { AdvocateData } from "./api/advocates/types";
import Footer from "./pagination/footer";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateData[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2; // Number of items per page

  const handleSearch = () => {
    fetch(`/api/advocates?page=${page}&limit=${limit}&term=${searchTerm}`).then(
      (response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
          setTotalPages(jsonResponse.totalPages);
        });
      }
    );
  };

  useEffect(() => {
    handleSearch();
  }, [page]);

  const onChange = (e: { target: { value: string } }) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(1);
    handleSearch();
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="table-fixed w-full overflow-hidden">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: AdvocateData) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  <div className="relative group h-32 overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
                    {advocate.specialties.map((s) => (
                      <div className="bg-w">{s}</div>
                    ))}
                  </div>
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Footer page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
