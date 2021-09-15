import React, { useEffect, useState, useRef } from "react";
import useForm from "../../hooks/useForm";
import db from "../../firebase";
import { BiBookAdd } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import "./InvoiceList.scss";

const InvoiceList = ({ setShowModal, totalInvoices, setTotalInvoices }) => {
  const [getData, setGetData] = useState([]);
  const [open, setOpen] = useState(false);
  const { values, setValues, handleStatus, status } = useForm();

  useEffect(() => {
    db.collection("data").onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>
        arr.push({ id: doc.id, value: doc.data() })
      );
      setGetData(arr);
      setTotalInvoices(arr.length);
    });
  }, []);

  const [isActive, setIsActive] = useState(null);
  const btnRef = useRef();

  const openHandle = (data) => {
    btnRef.current.disabled = setIsActive(data.id);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    db.collection("data")
      .doc(data.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setOpen(!open);
  };
  console.log(status);

  return (
    <div className="invoice-list-container">
      <div>Invoices</div>
      <div className="invoice-list-container_inner-container">
        <div>
          There are <span className="totalInvoice">{totalInvoices}</span> total
          invoices
        </div>
        <ul>
          <li>Pending</li>
          <li>Draft</li>
          <li>Paid</li>
        </ul>
        <div>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="button"
          >
            <BiBookAdd className="icon" />
          </button>
        </div>
      </div>

      <div className="list-container">
        {getData.map((data) => (
          <div key={data.id} className="list-container__item">
            <div
              className={
                isActive !== data.id
                  ? "open-main-container"
                  : "close-main-container"
              }
              id={data.id}
            >
              <div>{`#${data.id.slice(0, 6)}`}</div>
              <div>UI/UX</div>
              <div>{data.value.cityFrom}</div>
              <div>{data.value.countryFrom}</div>
              <div className="status-icon">Pending</div>
              <button
                className="forward-btn detailed-btn"
                onClick={() => openHandle(data)}
                ref={btnRef}
                disabled={
                  isActive !== data.id && !open && !status ? false : true
                }
              >
                <IoIosArrowForward className="forward-icon" />
              </button>
            </div>

            <div
              className={
                open && isActive == data.id
                  ? "detail-open-container"
                  : "detail-close-container"
              }
            >
              <div className="detail-open-container__first-item">
                <div className="detail-open-container__first-item__inner-item">
                  <div>Status</div>
                  <div className={`status-icon left ${status ? "paid" : ""}`}>
                    {!status ? "Pending" : "Paid"}
                  </div>
                </div>

                <div>
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(data)}>
                    Delete
                  </button>
                  <button className="mark" onClick={() => handleStatus(data)}>
                    Mark as Paid
                  </button>
                </div>
              </div>

              <div className="detail-open-container__second-item">
                <div>{`#${data.id.slice(0, 6)}`}</div>
                <div>UI/UX</div>
                <button className="forward-btn" onClick={openHandle}>
                  <IoIosArrowForward
                    className="forward-icon"
                    name="container"
                  />
                </button>
              </div>

              <div className="detail-open-container__second-item">
                <div>{data.value.cityFrom}</div>
                <div>{data.value.cityFrom}</div>
                <div>{data.value.countryFrom}</div>
              </div>
            </div>
          </div>
        ))}
        {/* // : ( //{" "}
            <React.Fragment>
              // <div>{`#${data.id.slice(0, 6)}`}</div>
              // <div>UI/UX</div>
              // <div>Adress to</div>
              // <div>Invoice Data</div>
              // <div>....</div>
              // <div>Bill To</div>
              // <div>...</div>
              // <div>Sent To</div>
              // <div>email to...</div>
              //{" "}
            </React.Fragment> */}

        {/* <div className="list-container__item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, fuga natus earum, ratione iure porro deleniti animi
          velit nesciunt voluptate sequi laborum quae, ipsam hic?
        </div>
        <div className="list-container__item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, fuga natus earum, ratione iure porro deleniti animi
          velit nesciunt voluptate sequi laborum quae, ipsam hic?
        </div>
        <div className="list-container__item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, fuga natus earum, ratione iure porro deleniti animi
          velit nesciunt voluptate sequi laborum quae, ipsam hic?
        </div>
        <div className="list-container__item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, fuga natus earum, ratione iure porro deleniti animi
          velit nesciunt voluptate sequi laborum quae, ipsam hic?
        </div> */}
      </div>
    </div>
  );
};

export default InvoiceList;
