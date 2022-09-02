import { addDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import Header from "../header/Header";
import "./group.css";

const Group = () => {
  //   let totalNamesInList = [];
  const navigate = useNavigate();
  const [totalNamesInList, setTotalNamesInList] = useState([
    {
      name: auth.currentUser && auth.currentUser.displayName,
      email: auth.currentUser && auth.currentUser.email,
      products: [],
    },
  ]);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const toggleUserMenu = () => {
    setUserMenuIsOpen(!userMenuIsOpen);
  };

  return (
    <div className="group-container">
      <Header />

      {userMenuIsOpen ? (
        <>
          <div className="total-persons">
            {/* {totalNamesInList && (
              <> */}
            {/* </> */}
            {/* )} */}
          </div>
          <form
            className="group-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="inputs">
              <input
                type="text"
                name="text"
                className="group-add-form-field"
                placeholder="Enter member's name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                name="email"
                className="group-add-form-field"
                placeholder="Enter member's e-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="group-form-btns">
              <button
                className="submit-btn-group"
                onClick={async () => {
                  const groupDocRef = doc(db, "groups", auth.currentUser.uid);
                  const updateDoc = await setDoc(
                    groupDocRef,
                    {
                      totalNamesInList,
                    },
                    {
                      merge: true,
                    }
                  )
                    // .then(() => {
                    //   const addDoc = setDoc(
                    //     doc(db, "userProducts", auth.currentUser.uid),
                    //     {
                    //       productPurchased: [
                    //         {
                    //           PREV_DATA_FINAL: [],
                    //         },
                    //         {},
                    //       ],
                    //     }
                    //   );
                    // })
                    .then(() => {
                      totalNamesInList.forEach((element) => {
                        console.log(element.name);
                        localStorage.setItem(
                          element.name,
                          JSON.stringify({
                            productNames: [null],
                            productPrices: [null],
                            personName: element.name,
                          })
                        );
                      });
                      navigate("/dashboard");
                    });
                }}
              >
                Save members
              </button>
              <button
                className="btn-dashboard-add-group create-group dashboard-signup btn-dashboard-add-group"
                onClick={() => {
                  if (email !== null && name !== null) {
                    setTotalNamesInList([
                      ...totalNamesInList,
                      {
                        name: name,
                        email: email,
                        products: [],
                      },
                    ]);
                    // console.log(totalNamesInList);
                  }
                }}
              >
                Add member
              </button>
              <button
                className="create-group dashboard-signup classic"
                onClick={toggleUserMenu}
              >
                Cancel
              </button>
            </div>
          </form>

          {totalNamesInList !== 0 && (
            <>
              <div className="names-container-group-pannel">
                {totalNamesInList.map((item, index) => {
                  return (
                    <div key={index} className="inside-names-container">
                      <p>{item.name}</p>
                      <p>{item.email}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <p>YOU'LL NEED TO ADD MEMBERS TO PROCEED</p>
          <div className="add-member">
            <button onClick={toggleUserMenu}>
              <AiOutlinePlusCircle />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Group;
