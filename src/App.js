import React, { useState } from "react";
import InvoiceList from "./components/InvoiceList/InvoiceList";
import NewInvoice from "./components/NewInvoice/NewInvoice";
import "./App.scss";

function App() {
  const [totalInvoices, setTotalInvoices] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <InvoiceList
        setShowModal={setShowModal}
        totalInvoices={totalInvoices}
        setTotalInvoices={setTotalInvoices}
      />
      <NewInvoice showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
