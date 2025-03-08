"use client";

import { useEffect, useState } from "react";
import { AdvocateData } from "./api/advocates/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateData[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateData[]>([]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: { target: { value: string; }; }) => {
    const filteredAdvocates = advocates.filter((advocate) => {
      const advocatePropertiesAsLowerCaseString = Object.values(advocate).map((a) => a.toString().toLowerCase());
      const searchTermAsLowerCaseString = e.target.value.toLowerCase();

      return (
        advocatePropertiesAsLowerCaseString.some((v) => v?.includes(searchTermAsLowerCaseString))
      );
    });
    setFilteredAdvocates(filteredAdvocates);
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
      <table>
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
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
