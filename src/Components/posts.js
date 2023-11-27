import React from "react";
import { useNavigate } from "react-router-dom";
import "./posts.css";
import { convertToDateMonthYear } from "../Utility";
export const Posts = ({ posts, loading, type }) => {
  const submit = (id) => {
    navigate(`/modify/${id}`);
  };
  console.log("inside body", posts, "+", type);
  const navigate = useNavigate();

  return (
    <div className="detailsTable1">
      {posts.id != 0 && (
        <table className="">
          <thead>
            <tr>
              <th scope="col">SERIAL No.</th>
              <th scope="col">ITEM</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">DATE</th>
              <th scope="col">TO</th>
              <th scope="col">FROM</th>
              <th scope="col">CLEARED</th>
              {type != 2 && <th scope="col">STATUS</th>}
            </tr>
          </thead>
          {posts?.map((details) => {
            return (
              <tbody>
                <tr className="" key={details?.id}>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={details.serialNumber}
                      placeholder=""
                      name="serialNumber"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={details.item}
                      placeholder=""
                      name="item"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      value={details.quantity}
                      placeholder=""
                      name="quantity"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={convertToDateMonthYear(details.dates)}
                      placeholder=""
                      name="date"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={details.toP}
                      placeholder=""
                      name="to"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={details.fromP}
                      placeholder=""
                      name="from"
                      readonly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={details.cleared}
                      placeholder=""
                      name="cleared"
                      readonly
                    />
                  </td>

                  <td>
                    {type != 2 && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => submit(details?.id)}
                      >
                        Modify
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};
