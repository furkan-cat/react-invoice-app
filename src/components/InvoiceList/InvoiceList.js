import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import db from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
import { BiBookAdd } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import "./InvoiceList.scss";

const InvoiceList = ({ setShowModal, totalInvoices, setTotalInvoices }) => {
  const [getData, setGetData] = useState([]);

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
            <div>{`#${data.id.slice(0, 6)}`}</div>
            <div>{data.value.cityFrom}</div>
            <div>{data.value.countryFrom}</div>
            <IoIosArrowForward className="forward-icon"/>
          </div>
        ))}

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
