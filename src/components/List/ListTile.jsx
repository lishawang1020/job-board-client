import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./List.css";

export default function SearchTile(props) {
  const info = props.jobInfo;
  const jobDetailUrl = "/jobDetail/" + info._id;
  return (
    <div className="card" id="box">
      <div className="card-body">
        <h5 className="card-title">{info.jobTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{info.location}</h6>
        <p className="card-text">{info.company}</p>
        <NavLink to={jobDetailUrl} className="card-link">
          Job detail
        </NavLink>
      </div>
    </div>
  );
}
