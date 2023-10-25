import React, { useEffect, useState } from "react";
import axios from "axios";
import "./history.css";
import { convertToDateMonthYear } from "../Utility";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const History = (props) => {
  const [mgpDetails, setMGPDetails] = useState();
  const status = props.history
  console.log("inside history",status)
  useEffect(() => {
    const displayAllHistory = async (e) => {
      try {
         await axios.get("http://localhost:8700/history").then((response) => {
 
         if(response.data.hasOwnProperty('message') ){
          if(status == 2)
            toast.info("No such details",{autoClose:1000})
          }
        else{           
        setMGPDetails(response.data);
        console.log(mgpDetails);
            }
          //dispatch(addMgp(mgpDetails))
        });
      } catch (err) {
        console.log(err);
      }
    };
    displayAllHistory();
  }, [status]);

  return (
    <div className="HistoryDetails">
      <div className="HistoryTable">
        {mgpDetails!= null &&
        <table className="HistoryTable1 ">
          <thead>
            <tr>
              <th scope="col">SERIAL No.</th>
              <th scope="col">ITEM</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">DATE</th>
              <th scope="col">TO</th>
              <th scope="col">FROM</th>
              <th scope="col">CLEARED</th>
            </tr>
          </thead>
            {mgpDetails?.map((mgpDetails1) => {
              return (
                <tbody>

                <tr className="table-active">
                  <td>
                    <input
                      className="form-control "
                      type="text"
                      value={mgpDetails1.serialNumber}
                      placeholder=""
                      name="serialNumber"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control "
                      type="text"
                      value={mgpDetails1.item}
                      placeholder=""
                      name="item"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control "
                      type="number"
                      value={mgpDetails1.quantity}
                      placeholder=""
                      name="quantity"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control "
                      type="text"
                      value={convertToDateMonthYear(mgpDetails1.dates)}
                      placeholder=""
                      name="date"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control "
                      type="text"
                      value={mgpDetails1.toP}
                      placeholder=""
                      name="to"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control "
                      type="text"
                      value={mgpDetails1.frmP}
                      placeholder=""
                      name="from"
                      readonly
                    />
                  </td>
                  <td>
                  <input
                      className="form-control "
                      type="text"
                      value={mgpDetails1.cleared}
                      placeholder=""
                      name="from"
                      readonly
                    />
                  </td>
                </tr>
              </tbody>

              );
            })}
        </table>
}
      </div>
      <ToastContainer/>
    </div>
  );
};
