import React, { useEffect, useState, useRef } from "react";
import useForm from "../../hooks/useForm";
import db from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
import { BiBookAdd } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import "./InvoiceList.scss";

const InvoiceList = ({ setShowModal, totalInvoices, setTotalInvoices }) => {
  const [getData, setGetData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("data").onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>
        arr.push({ id: doc.id, value: doc.data() })
      );
      console.log(arr);
      setGetData(arr);
      setTotalInvoices(arr.length);
    });
  }, []);

  const [isActive, setIsActive] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [id, setId] = useState();
  const btnRef = useRef();
  const detailRef = useRef();

  const openHandle = (data) => {
    btnRef.current.disabled = setIsActive(data.id);
    setOpen(!open);
  };

  const closeHandle = (e) => {};

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
              <div className="status-icon">
                <span className="status-circle"></span>Pending
              </div>
              <button
                className="forward-btn detailed-btn"
                onClick={() => openHandle(data)}
                ref={btnRef}
                disabled={isActive !== data.id && !open ? false : true}
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
              <div className="list-container__item--open__head-item">
                <div>Status</div>
                <div className="status-icon">
                  <span className="status-circle"></span>Pending
                </div>
                <button>Edit</button>
                <button>Delete</button>
                <button>Mark as Paid</button>
                <button
                  className="forward-btn"
                  onClick={openHandle}
                >
                  <IoIosArrowForward
                    className="forward-icon"
                    name="container"
                  />
                </button>
              </div>
              <div className="list-container__item--open__up-item">
                <div>{`#${data.id.slice(0, 6)}`}</div>
                <div>UI/UX</div>
              </div>
              <div className="list-container__item--open__mid-item">
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
