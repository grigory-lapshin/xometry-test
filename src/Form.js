//@flow
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { useStoreon } from "storeon/react";

Modal.setAppElement("#root");

function ListingForm() {
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

  function validateTitle(title) {
    if (!title) return "Required";
    if (title?.length <= 1) return "Too short!";
    if (title?.length >= 256) return "Too long!";
  }

  function validateDescription(description) {
    if (!!description && description?.length >= 512) return "Too long!";
  }

  function validatePrice(price) {
    if (!price) return "Required";
    if (isNaN(parseInt(price))) return "Price must be a number!";
    if (parseInt(price) <= 0) return "Price must be positive";
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
          onSubmit={values => {
            if (idToEdit === null) create(values);
            else if (idToEdit !== null) update(values);
            closeForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="title" validate={validateTitle} />
              {errors.title && touched.title && errors.title}
              <Field name="description" validate={validateDescription} />
              {errors.description && touched.description && errors.description}
              <Field type="number" name="price" validate={validatePrice} />
              {errors.price && touched.price && errors.price}
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ListingForm;
