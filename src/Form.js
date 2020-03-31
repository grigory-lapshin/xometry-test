//@flow
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Modal from "react-modal";
import { Formik } from "formik";
import { useStoreon } from "storeon/react";

Modal.setAppElement("#root");

function Form() {
  const { dispatch, listingsMap, idToEdit } = useStoreon(
    "listingsMap",
    "idToEdit"
  );

  useEffect(() => {
    if (idToEdit !== null) setIsModalOpen(true);
  }, [idToEdit]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function create(listing) {
    dispatch("create", listing);
  }

  function update(listing) {
    dispatch("update", { ...listing, id: idToEdit });
  }

  function closeForm() {
    dispatch("resetIdToEdit");
    setIsModalOpen(false);
  }

  function openForm() {
    setIsModalOpen(true);
  }

  function validate(values) {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (isNaN(parseInt(values.price))) {
      errors.price = "Required";
    }
    return errors;
  }

  return (
    <>
      <button onClick={openForm}>create</button>
      <Modal isOpen={isModalOpen} contentLabel="Example Modal">
        <button onClick={() => setIsModalOpen(false)}>close</button>
        <Formik
          initialValues={
            idToEdit === null
              ? { title: "", description: "", price: "" }
              : { ...listingsMap[idToEdit] }
          }
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            if (idToEdit === null) create(values);
            if (idToEdit !== null) update(values);

            setSubmitting(false);
            closeForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && errors.title}
              <input
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              <input
                type="number"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              {errors.price && touched.price && errors.price}
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default Form;
