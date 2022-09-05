import React, { useEffect, useState, useContext } from "react";
import "./amountScreen.css";
import "../../dashboard/dashboard.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import DashboardContext from "../../../context/DashboardContext";

const AmountScreen = () => {
  const { toSetRoutesIfDatIsProvided, groupDocData } =
    useContext(DashboardContext);
  const [elementToBeSaved, setElementToBeSaved] = useState();
  const [arrForStoringNamesToBePushed, setArrForStoringNamesToBePushed] =
    useState([]);
  const [product, setProduct] = useState();
  const [price, setPrice] = useState();
  const [totalNamesInListDummy, setTotalNamesInListDummy] = useState(
    groupDocData && groupDocData.totalNamesInList
  );
  setInterval(() => {
    const data = groupDocData && groupDocData.totalNamesInList;
    setTotalNamesInListDummy(data);
  }, 500);
  const [updateDocRef, setUpdateDocRef] = useState({});

  const handleSubmit = async () => {
    arrForStoringNamesToBePushed.forEach((element) => {
      setElementToBeSaved(JSON.parse(localStorage.getItem(element)));
      localStorage.setItem(
        element,
        JSON.stringify({
          productNames: [...elementToBeSaved.productNames, product],
          productPrices: [
            ...elementToBeSaved.productPrices,
            price / arrForStoringNamesToBePushed.length,
          ],
          paidAmount: elementToBeSaved.paidAmount
            ? [...elementToBeSaved.paidAmount]
            : [],
          paidProducts: elementToBeSaved.paidProducts
            ? [...elementToBeSaved.paidProducts]
            : [],
          personName: element,
        })
      );
      console.log(JSON.parse(localStorage.getItem(element)));
    });
  };
  // if (arrForStoringNamesToBePushed !== []) {
  //   arrForStoringNamesToBePushed.map(async (item, index) => {
  //     const getProductsDoc = doc(db, "userProducts", auth.currentUser.uid);
  //     const docData = await getDoc(getProductsDoc);
  //     const dummyObj = {};
  //     const prevDoc = {
  //       prevDataInside: {
  //         PREV_DATA_FINAL:
  //           docData.exists &&
  //           docData.data().productPurchased[0].PREV_DATA_FINAL !==
  //             undefined &&
  //           docData.data().productPurchased[0].PREV_DATA_FINAL !== []
  //             ? docData
  //                 .data()
  //                 .productPurchased[0].PREV_DATA_FINAL.map((item) => {
  //                   if (docData.exists) {
  //                     const prevData =
  //                       docData.data().productPurchased[1] !== []
  //                         ? docData.data().productPurchased[1]
  //                         : null;
  //                     return prevData;
  //                   }
  //                 })
  //             : {},
  //       },
  //     };
  // return {
  //   product:
  //     item.product !== undefined ? item.product : null,
  //   price: item.price !== undefined ? item.price : null,
  //   name: item.name !== undefined ? item.name : null,
  //   id: item.id !== undefined ? item.id : null,
  // };
  //   console.log([
  //     prevDoc ? prevDoc : null,
  //     {
  //       product: product,
  //       price: price / arrForStoringNamesToBePushed.length,
  //       name: item,
  //       id: index,
  //     },
  //   ]);
  //   const updateDocUndefined = await updateDoc(getProductsDoc, {
  //     productPurchased: [
  //       prevDoc,
  //       {
  //         product: product,
  //         price: price / arrForStoringNamesToBePushed.length,
  //         name: item,
  //         id: index,
  //       },
  //     ],
  //   });

  //   // console.log(dummyObj);
  // });
  // }
  // if (arrForStoringNamesToBePushed !== []) {
  //   //arry for iditraing through all the persons in group
  //   groupDocData.totalNamesInList.map(async (item, index) => {
  //     if (arrForStoringNamesToBePushed.includes(item.name)) {
  //       const docRef = doc(db, "groups", auth.currentUser.uid);
  //       const dummyObj = {
  //         ...item,
  //         products: [
  //           // item.products ? item.products : ,
  //         ],
  //       };
  //       dummyObj.products.push({
  //         product: product,
  //         price: price,
  //       });
  //       totalNamesInListDummy.products &&
  //         totalNamesInListDummy.products.push(dummyObj.products);
  //       totalNamesInListDummy.splice(index, 1);
  //       console.log(totalNamesInListDummy);
  //       // setTotalNamesInListDummy([...totalNamesInListDummy, dummyObj]);
  //       await updateDoc(docRef, {
  //         totalNamesInList: totalNamesInListDummy,
  //       }).catch((e) => {
  //         alert(e.message);
  //       });
  //     }
  //     //map ends
  //   });

  // groupDocData.totalNamesInList.forEach(async (obj, index) => {
  //   const docRef = doc(db, "groups", auth.currentUser.uid);
  //   //statement to check where the name is present
  //   if (obj.name in arrForStoringNamesToBePushed) {
  //     productAndPrice.push({
  //       productName: product,
  //       productPrice: price,
  //     });
  //     totalNamesInListDummy.splice(index, 1, {
  //       name: obj.name,
  //       email: obj.email,
  //       ...productAndPrice,
  //     });
  //     setUpdateDocRef({
  //       adminName: groupDocData && groupDocData.adminName,
  //       groupName: groupDocData && groupDocData.groupName,
  //       ...totalNamesInListDummy,
  //     });
  //     await setDoc(docRef, updateDocRef);
  //   }
  //   //groupDoc ends
  // });
  // if (arrForStoringNamesToBePushed !== []) {
  //   groupDocData.totalNamesInList.forEach((obj, index) => {
  //     arrForStoringNamesToBePushed.forEach((item) => {
  //       if (obj.name === item) {
  //         totalNamesInListDummy.forEach((dummyElement, indexFordummy) => {
  //           if (index === indexFordummy) {
  //             totalNamesInListDummy.splice(index, 1);
  //             const dummyOfDummyElement = {
  //               ...dummyElement,
  //               ...productAndPrice,
  //             };
  //             setTotalNamesInListDummy([
  //               ...totalNamesInListDummy,
  //               ...dummyOfDummyElement,
  //             ]);

  //             // totalNamesInListDummy.push({
  //             //   ...dummyElement,
  //             //   productAndPrice,
  //             // });
  //             setUpdateDocRef({
  //               ...groupDocData,
  //               totalNamesInList: [...totalNamesInListDummy],
  //             });
  //           }
  //         }),
  //           console.log(totalNamesInListDummy);
  //       }
  //     });
  //   });
  // }
  // };

  return (
    <div className="amount-screen">
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="text"
          id="group-db-text"
          placeholder="Enter product name"
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
        <input
          type="number"
          name="text"
          id="group-db-text"
          placeholder="Enter the amount"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className="radio-group">
          <p>CHOOSE MEMBERS TO SPLIT MONEY</p>
          {toSetRoutesIfDatIsProvided &&
            groupDocData.totalNamesInList.map((item, index) => {
              return (
                <>
                  <div className="group-one-radio">
                    <label htmlFor="radio">{item.name}</label>
                    <input
                      type="radio"
                      name={item.name}
                      id="radio"
                      value={item.name}
                      onChange={(e) => {
                        setArrForStoringNamesToBePushed([
                          ...arrForStoringNamesToBePushed,
                          e.target.name,
                        ]);
                        // console.log(arrForStoringNamesToBePushed);
                      }}
                    />
                  </div>
                </>
              );
            })}
        </div>
        <button type="submit" className="dashboard-signup special-group-btn">
          Submit (click twice)
        </button>
      </form>
    </div>
  );
};

export default AmountScreen;
