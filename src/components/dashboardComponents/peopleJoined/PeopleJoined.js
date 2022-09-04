import React, { useEffect, useState, useContext, useRef } from "react";
import "./peopleJoined.css";
import "../../dashboard/dashboard.css";
import { auth, db } from "../../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import DashboardContext from "../../../context/DashboardContext";
import { Link } from "react-router-dom";

const PeopleJoined = () => {
  const ref = useRef(false);
  const user = auth.currentUser;
  const [docData, setDocData] = useState({});
  // const [fecthGroupDoc, groupDocData] = useContext(DashboardContext);

  // console.log(isAddAmountOpen);

  // const fetchData = async () => {
  //   console.log("invoke func ok");
  //   const docRef = doc(db, "groups", auth && auth.currentUser.uid);
  //   const docRawData = await getDoc(docRef);
  //   if (docRawData.exists()) {
  //     setDocData(docRawData.data());
  //     console.log(docData);
  //   } else {
  //     console.log("not found");
  //   }
  // };

  // window.onload = fetchData;
  // window.addEventListener("resize", () => {
  //   fetchData();
  // });
  // window.addEventListener("DOMContentLoaded", () => {
  //   fetchData();
  // });

  useEffect(() => {
    const fetchData = async () => {
      console.log("invoke func ok");
      const docRef = doc(db, "groups", auth && auth.currentUser.uid);
      const docRawData = await getDoc(docRef);
      if (docRawData.exists()) {
        setDocData(docRawData);
        console.log(docData);
      } else {
        console.log("not found");
      }
    };
    fetchData();
    return () => {
      ref.current = true;
    };
  }, []);

  return (
    <div className="people-who-joined-group-screen">
      <Link className="buttons" to="/dashboard/add-amount">
        Add amount
      </Link>
      <p>MEMBERS LIST</p>
      <div className="scroll">
        {docData.exists
          ? docData.data().totalNamesInList.map((item, index) => {
              return (
                <>
                  <Link
                    to={`/dashboard/${item.email}`}
                    className="white"
                    key={index.toString()}
                  >
                    {item.name}
                  </Link>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PeopleJoined;
