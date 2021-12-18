import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import "./Post.css";
import Navbar from "../Navbar/Navbar";

export default function Post() {
  const navigate = useNavigate();
  const username = localStorage.getItem("jobhubUsername");
  const location = useLocation();
  const [jobData, setJobData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    description: "",
    employerEmail: "",
    companyWebsite: "",
    createdBy: "",
  });

  useEffect(() => {
    if (location.state) {
      if (location.state.postData) {
        const postData = location.state.postData;
        setJobData({
          jobTitle: postData.jobTitle,
          company: postData.company,
          location: postData.location,
          description: postData.description,
          employerEmail: postData.employerEmail,
          companyWebsite: postData.companyWebsite,
          createdBy: username,
        });
      }
    }
  }, []);

  if (!localStorage.getItem("jobhubUsername")) {
    return <Navigate to="/signIn" />;
  }

  return (
    <div>
      <Navbar />
      <div class="container" id="wrapper">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <h1 className="h3 mb-3 fw-normal">Create job post</h1>

            <div>
              <div class="form-group">
                <label for="job-title">
                  Job title <span class="require">*</span>{" "}
                </label>
                <input
                  value={jobData.jobTitle}
                  onChange={(e) => {
                    const jobTitle = e.target.value;
                    setJobData({
                      ...jobData,
                      jobTitle: jobTitle,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="job-title"
                />
              </div>
              <div class="form-group">
                <label for="company-name">
                  Company name <span class="require">*</span>
                </label>
                <input
                  value={jobData.company}
                  onChange={(e) => {
                    const company = e.target.value;
                    setJobData({
                      ...jobData,
                      company: company,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="company-name"
                />
              </div>
              <div class="form-group">
                <label for="location">
                  Location <span class="require">*</span>
                </label>
                <input
                  value={jobData.location}
                  onChange={(e) => {
                    const location = e.target.value;
                    setJobData({
                      ...jobData,
                      location: location,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="location"
                />
              </div>
              <div class="form-group">
                <label for="description">
                  Description <span class="require">*</span>
                </label>
                <input
                  value={jobData.description}
                  onChange={(e) => {
                    const description = e.target.value;
                    setJobData({
                      ...jobData,
                      description: description,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="description"
                />
              </div>
              <div class="form-group">
                <label for="employerEmail">
                  Employer email contact <span class="require">*</span>
                </label>
                <input
                  value={jobData.employerEmail}
                  onChange={(e) => {
                    const employerEmail = e.target.value;
                    setJobData({
                      ...jobData,
                      employerEmail: employerEmail,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="employerEmail"
                />
              </div>
              <div class="form-group">
                <label for="companyWebsite">Company Website</label>
                <input
                  value={jobData.companyWebsite}
                  onChange={(e) => {
                    const companyWebsite = e.target.value;
                    setJobData({
                      ...jobData,
                      companyWebsite: companyWebsite,
                    });
                  }}
                  type="text"
                  class="form-control"
                  name="companyWebsite"
                />
              </div>
              <div class="form-group">
                <p id="requiredFields">
                  <span class="require">*</span> - required fields
                </p>
              </div>

              <div class="form-group">
                <button
                  onClick={() => {
                    if (
                      !jobData.jobTitle ||
                      !jobData.company ||
                      !jobData.location ||
                      !jobData.description ||
                      !jobData.employerEmail
                    ) {
                      alert("Please enter all required fields");
                    } else {
                      setJobData({
                        ...jobData,
                        createdBy: username,
                      });
                      if (location.state) {
                        if (location.state.postData) {
                          const postData = location.state.postData;
                          let newJobData = jobData;
                          jobData._id = postData._id;
                          axios
                            .put("/api/job", newJobData)
                            .then((response) => {
                              if (response.status === 200) {
                                if (response.data._id) {
                                  const jobDetailUrl =
                                    "/jobDetail/" + response.data._id;
                                  navigate(jobDetailUrl);
                                }
                              }
                            })
                            .catch((error) => console.log(error));
                        }
                      }
                      axios
                        .post("/api/job", jobData)
                        .then((response) => {
                          if (response.status === 200) {
                            if (response.data._id) {
                              const jobDetailUrl =
                                "/jobDetail/" + response.data._id;
                              navigate(jobDetailUrl);
                            }
                          }
                        })
                        .catch((error) => console.log(error));
                    }
                  }}
                  class="btn btn-primary"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setJobData({
                      jobTitle: "",
                      company: "",
                      location: "",
                      description: "",
                      employerEmail: "",
                      companyWebsite: "",
                      createdBy: "",
                    });
                  }}
                  class="btn btn-default"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
