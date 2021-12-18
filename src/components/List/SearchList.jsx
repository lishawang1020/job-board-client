import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./List.css";
import ListTile from "./ListTile";

export default function SearchList(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const prefix = location.state.prefix;
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const url = "/api/job/search/" + prefix;
    axios
      .get(url)
      .then((response) => {
        setJobList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const jobTileList = [];
  for (let i = 0; i < jobList.length; i++) {
    jobTileList.push(<ListTile jobInfo={jobList[i]} />);
  }

  return (
    <div id="wrapperDiv">
      <Navbar />
      <div id="jobDiv">
        <h1 className="h3 mb-3 fw-normal" id="resultTitle">Search results for '{prefix}'</h1>
        <div>{jobTileList}</div>
      </div>
    </div>
  );
}
