import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    prefix: "",
  });

  return (
    <div>
      <Navbar />
      <div className="text-center" id="center">
        <h1 className="h3 mb-3 fw-normal" id="siteName">
          Welcome to JobHub
        </h1>
        <div className="form-floating">
          <input
            value={searchData.prefix}
            onChange={(e) => {
              const prefix = e.target.value;
              setSearchData({
                ...searchData,
                prefix: prefix,
              });
            }}
            className="form-control"
            id="floatingInput"
            placeholder="Search for jobs"
          />
          <label>Search for jobs</label>
        </div>
        <button
          onClick={() => {
            if (searchData.prefix) {
              navigate("/search", { state: { prefix: searchData.prefix } });
            }
          }}
          className="w-40 btn btn-lg btn-primary"
          id="searchBtn"
        >
          Search
        </button>
      </div>
    </div>
  );
}
