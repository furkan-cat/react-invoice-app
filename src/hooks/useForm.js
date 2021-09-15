import { useState } from "react";
import db from "../firebase";

const useForm = () => {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({
    streetAddressFrom: "",
    streetAddressTo: "",
    cityFrom: "",
    cityTo: "",
    zipCodeFrom: "",
    zipCodeTo: "",
    countryFrom: "",
    countryTo: "",
    nameTo: "",
    emailTo: "",
    invoiceDate: "",
    select: "",
    description: "",
    paymentDueDate: "",
    status: status,
  });

  const handleStatus = (data) => {
    db.collection("data").doc(data.id).update({ status: !status });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    db.collection("data")
      .add({
        cityFrom: values.cityFrom,
        cityTo: values.cityTo,
        countryFrom: values.countryFrom,
        countryTo: values.countryTo,
        emailTo: values.emailTo,
        nameTo: values.nameTo,
        streetAddressFrom: values.streetAddressFrom,
        streetAddressTo: values.streetAddressTo,
        zipCodeFrom: values.zipCodeFrom,
        zipCodeTo: values.zipCodeTo,
        invoiceDate: values.invoiceDate,
        select: values.select,
        description: values.description,
        paymentDueDate: values.paymentDueDate,
        status: status,
      })
      .then((docRef) => {
        console.log("Data Successfully Submitted", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document", error);
      });
  };

  return { handleChange, values, handleSubmit, handleStatus, status };
};

export default useForm;

// {
//   cityFrom: values.cityFrom,
// },
// {
//   cityTo: values.cityTo,
// },
// {
//   countryFrom: values.countryFrom,
// },
// {
//   countryTo: values.countryTo,
// },
// {
//   emailTo: values.emailTo,
// },

// {
//   nameTo: values.nameTo,
// },
// {
//   streetAddressFrom: values.streetAddressFrom,
// },
// {
//   streetAddressTo: values.streetAddressTo,
// },
// {
//   zipCodeFrom: values.zipCodeFrom,
// },
// {
//   zipCodeTo: values.zipCodeTo,
// }
