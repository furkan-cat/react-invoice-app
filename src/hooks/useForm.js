import { useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const useForm = () => {
  const [errors, setErrors] = useState({});
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
  });
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
      })
      .then((docRef) => {
        console.log("Data Successfully Submitted", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document", error);
      });
  };

  return { handleChange, values, handleSubmit };
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
