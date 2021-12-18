import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./List.css";
import ListTile from "./ListTile";

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}

export default function FavoriteList() {
  const location = useLocation();
  const [favList, setFavList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [num, setNum] = useState(0);
  const [jobTileList, setJobTileList] = useState([]);
  const forceUpdate = useForceUpdate();
  const [mounted, setMounted] = useState(false);

  let myFavList;
  let myJobList = [];
  //let jobTileList = [];

  if (!mounted) {
    let promises = [];
    let promises2 = [];
    promises.push(
      axios
        .get("/api/favorite/user/" + localStorage.getItem("jobhubUsername"))
        .then((response) => {
          myFavList = response.data;
        })
    );
    Promise.all(promises).then(() => {
      for (let i = 0; i < myFavList.length; i++) {
        promises2.push(
          axios
            .get("/api/job/detail/" + myFavList[i].jobId)
            .then((response) => {
              myJobList.push(response.data);
              setJobTileList((oldList) => [
                ...oldList,
                <ListTile jobInfo={response.data} />,
              ]);
            })
        );
      }
    });
  }

  useEffect(() => {
    setMounted(true);
    forceUpdate();
  }, []);

  // if (!localStorage.getItem("jobhubUsername")) {
  //   return <Navigate to="/signIn" />;
  // }
  // axios
  //   .get("/api/favorite/user/" + localStorage.getItem("jobhubUsername"))
  //   .then((response) => {
  //     return axios.get("/api/job/detail/" + response.data[0].jobId);
  //   })
  //   .then((r) => {
  //     myJobList.push(r.data);
  //     jobTileList.push(<ListTile jobInfo={myJobList[0]} />);
  //     console.log(jobTileList);
  //     return jobTileList;
  //   })
  //   .then((r) => {});
  //     myFavList = response.data;
  //     let jobInfoUrl = "/api/job/detail/" + myFavList[1].jobId;
  //     axios.get(jobInfoUrl).then((res) => {
  //         console.log(res);
  //     });

  //   .then((res) => {
  //     let jobInfoUrl = "/api/job/detail/" + myFavList[1].jobId;
  //     axios.get(jobInfoUrl).then((res) => {
  //     const myJob = res.data;
  //     setJobTileList([...jobTileList, <ListTile jobInfo={myJob} />]);

  //  });
  //}, []);

  //   const promises = () => {
  //     axios.get(favListUrl).then((response) => {
  //       const myFavList = response.data;
  //       //for (let i = 0; i < myFavList.length; i++) {
  //       let jobInfoUrl = "/api/job/detail/" + myFavList[1].jobId;
  //       axios.get(jobInfoUrl).then((res) => {
  //         //console.log(res.data);
  //         const myJob = res.data;
  //         setJobTileList([...jobTileList, <ListTile jobInfo={myJob} />]);
  //         //jobTileList.push(<ListTile jobInfo={res.data} />);
  //       });
  //       //}
  //     });

  //     const Data = await Promise.all([...promises]);
  //     console.log(Data);
  //  };
  return (
    <div id="wrapperDiv">
      <Navbar />
      <div id="jobDiv">
        <h1 className="h3 mb-3 fw-normal" id="resultTitle">
          Favorite jobs
        </h1>
        <div>{jobTileList}</div>
      </div>
    </div>
  );
}
