import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./Detail.css";

export default function Detail(props) {
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState([]);
  const [btnState, setBtn] = useState("Favorite");
  const params = useParams();
  const jobId = params.jobId;
  const username = localStorage.getItem("jobhubUsername");

  useEffect(() => {
    const url = "/api/job/detail/" + jobId;
    axios
      .get(url)
      .then((response) => {
        setJobDetail(response.data);
      })
      .catch((error) => console.log(error));

    if (localStorage.getItem("jobhubUsername")) {
      const checkBtnUrl =
        "/api/favorite/fav/" +
        jobId +
        "/" +
        localStorage.getItem("jobhubUsername");
      axios
        .get(checkBtnUrl)
        .then((response) => {
          if (response.data.length !== 0) {
            setBtn("Unfavorite");
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div id="wrapperDiv">
      <Navbar />
      <div id="jobDiv">
        <h1 className="h3 mb-3 fw-normal" id="resultTitle">
          Job Detail
        </h1>
        <div className="card" id="box">
          <div className="card-body">
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">Job title</h6>
              <p className="card-text">{jobDetail.jobTitle}</p>
            </div>
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">Company name</h6>
              <p className="card-text">{jobDetail.company}</p>
            </div>
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">Location</h6>
              <p className="card-text">{jobDetail.location}</p>
            </div>
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">Description</h6>
              <p className="card-text">{jobDetail.description}</p>
            </div>
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">
                Employer email contact
              </h6>
              <p className="card-text">{jobDetail.employerEmail}</p>
            </div>
            {jobDetail.companyWebsite ? (
              <div className="detail-field">
                <h6 className="card-subtitle mb-2 text-muted">
                  Company website
                </h6>
                <a className="card-text">{jobDetail.companyWebsite}</a>
              </div>
            ) : (
              <div></div>
            )}
            <div className="detail-field">
              <h6 className="card-subtitle mb-2 text-muted">Posting Date</h6>
              <p className="card-text">{jobDetail.timestamp}</p>
            </div>
            <button
              onClick={() => {
                if (!localStorage.getItem("jobhubUsername")) {
                  navigate("/signIn");
                }
                if (btnState === "Favorite") {
                  let btnData = {
                    username: localStorage.getItem("jobhubUsername"),
                    jobId: jobId,
                  };
                  axios
                    .post("/api/favorite", btnData)
                    .then((response) => {
                      if (response.status === 200) {
                        setBtn("Unfavorite");
                      }
                    })
                    .catch((error) => console.log(error));
                } else {
                  let deleteFavUrl =
                    "/api/favorite/fav/" +
                    jobId +
                    "/" +
                    localStorage.getItem("jobhubUsername");
                  axios
                    .delete(deleteFavUrl)
                    .then((response) => {
                      if (response.status === 200) {
                        setBtn("Favorite");
                      }
                    })
                    .catch((error) => console.log(error));
                }
              }}
              className="btn btn-primary"
            >
              {btnState}
            </button>
            {jobDetail.createdBy === username ? (
              <span>
                <button
                  onClick={() => {
                    navigate("/post", { state: { postData: jobDetail } });
                  }}
                  class="btn btn-default"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    axios
                      .delete("/api/job/" + jobId)
                      .then((response) => {
                        navigate("/");
                      })
                      .catch((error) => console.log(error));
                  }}
                  class="btn btn-default"
                >
                  Delete
                </button>
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
