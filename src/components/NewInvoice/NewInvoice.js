import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useForm from "../../hooks/useForm";
import "./NewInvoice.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler(event);
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, []);
  return domNode;
};

const NewInvoice = ({ showModal, setShowModal }) => {
  const { handleChange, values, handleSubmit } = useForm();
  const terms = useRef();
  const due = useRef();
  let domNode = useClickOutside(() => {
    setShowModal(false);
  });

  let invoiceDateUnix = Date.now();
  let invoiceDate = new Date(invoiceDateUnix).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let futureDate = new Date();
  let paymentDueDateUnix = futureDate.setDate(
    futureDate.getDate() + parseInt(terms.current?.value)
  );

  let paymentDueDate = new Date(paymentDueDateUnix).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return ReactDOM.createPortal(
    <React.Fragment>
      <div ref={domNode} className="invoice-container">
        {showModal && (
          <form action="#" className="form-container" onSubmit={handleSubmit}>
            <label>Bill From </label>
            <label htmlFor="">Street Adress</label>
            <input
              type="text"
              id="streetAddressFrom"
              name="streetAddressFrom"
              value={values.streetAddressFrom || ""}
              onChange={handleChange}
            />
            <div className="em">
              <div className="form-block-container">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  id="cityFrom"
                  name="cityFrom"
                  value={values.cityFrom || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-block-container middle-block">
                <label htmlFor="">Zip Code</label>
                <input
                  type="number"
                  id="zipCodeFrom"
                  name="zipCodeFrom"
                  value={values.zipCodeFrom || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-block-container">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  id="countryFrom"
                  name="countryFrom"
                  value={values.countryFrom || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="">Bill to</label>
            <label htmlFor="">Client's Name</label>
            <input
              type="text"
              id="nameTo"
              name="nameTo"
              value={values.nameTo || ""}
              onChange={handleChange}
            />
            <label htmlFor="">Client's Email</label>
            <input
              type="email"
              id="emailTo"
              name="emailTo"
              value={values.emailTo || ""}
              onChange={handleChange}
            />
            <label htmlFor="">Street Adress</label>
            <input
              type="text"
              id="streetAddressTo"
              name="streetAddressTo"
              value={values.streetAddressTo || ""}
              onChange={handleChange}
            />
            <div>
              <div className="em">
                <div className="form-block-container">
                  <label htmlFor="">City</label>
                  <input
                    type="text"
                    id="cityTo"
                    name="cityTo"
                    value={values.cityTo || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-block-container middle-block">
                  <label htmlFor="">Zip Code</label>
                  <input
                    type="number"
                    id="zipCodeTo"
                    name="zipCodeTo"
                    value={values.zipCodeTo || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-block-container">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    id="countryTo"
                    name="countryTo"
                    value={values.countryTo || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="em">
              <div className="form-block-container">
                <label htmlFor="">Invoice Date</label>
                <input
                  type="text"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={invoiceDate || ""}
                />
              </div>
              <div className="form-block-container">
                <label htmlFor="">Payment Due</label>
                <input
                  type="text"
                  id="select"
                  name="select"
                  onChange={handleChange}
                  ref={due}
                  value={paymentDueDate || ""}
                />
              </div>
            </div>

            <label htmlFor="">Payment Terms</label>
            <select
              type="text"
              id="select"
              name="select"
              onChange={handleChange}
              ref={terms}
            >
              <option selected></option>
              <option value="60">Next 60 Days</option>
              <option value="30">Next 30 Days</option>
            </select>

            <label>Product Description</label>
            <textarea
              type="text"
              id="description"
              className="description"
              name="description"
              maxLength="150"
              onChange={handleChange}
              value={values.description || ""}
            />
            {/* <h3>Item List</h3>
            <div>
              <label htmlFor="">Item Name</label>
              <input type="text" />
              <label htmlFor="">City</label>
              <input type="text" />
              <label htmlFor="">Price</label>
              <input type="text" />
              <label htmlFor="">Total</label>
              <input type="text" />
            </div>{" "} */}
            <button type="submit" className="submit">
              Add New Item
            </button>
          </form>
        )}
      </div>
    </React.Fragment>,
    document.getElementById("portal")
  );
};

export default NewInvoice;
