//@flow
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { useStoreon } from "storeon/react";

Modal.setAppElement("#root");

function ImageInput({ setFieldValue, handleFiles, listing }) {
  useEffect(() => {
    if (listing?.picture) handleFiles(listing.picture);
  }, []);
  return (
    <>
      <p className="capitalize">Picture</p>
      <input
        id="file"
        name="picture"
        type="file"
        accept="image/png, image/jpeg"
        onChange={event => {
          setFieldValue("picture", event.currentTarget.files[0]);
          handleFiles(event.currentTarget.files[0]);
        }}
      />
      <div id="preview" />
    </>
  );
}

function TextInput(props) {
  return (
    <div className="flex flex-col items-stretch">
      <p className="capitalize">{props.name}</p>
      {props.multyline ? (
        <textarea rows="5" cols="33" {...props} className="border" />
      ) : (
        <input type={"text"} {...props} className="border" />
      )}
    </div>
  );
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

  function handleFiles(file) {
    const preview = document.getElementById("preview");

    if (!preview) return;

    preview.innerHTML = "";
    const img = document.createElement("img");
    const src = URL.createObjectURL(file);
    img.src = src;
    img.className = "border h-24";
    img.onload = function() {
      URL.revokeObjectURL(src);
    };
    preview.appendChild(img);
  }

  return (
    <>
      <div className="flex flex-row flex-no-wrap items-center">
        <div className="flex flex-grow">
          <h1 className="text-5xl">Listings</h1>
        </div>
        <button
          className="uppercase p-4 bg-red-500 text-white rounded shadow-md"
          onClick={openForm}
        >
          create
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        contentLabel="Example Modal"
        overlayClassName="fixed top-0 w-screen h-screen pt-16 "
        className="w-screen h-screen flex flex-col"
      >
        <div className="z-0 fixed top-0 w-screen h-screen bg-gray-500 opacity-75" />
        <div className="z-40 container mx-auto  bg-white flex-col">
          <div className="flex items-center pt-2">
            <h2 className="flex-grow text-xl pl-4">New listing</h2>
            <button
              onClick={closeForm}
              className="text-right pl-6 pr-4 text-2xl"
            >
              ×
            </button>
          </div>
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
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1 gap-2 p-4">
                  <Field name="title" validate={validateTitle}>
                    {({ field, form, meta }) => (
                      <div className="flex flex-col items-stretch">
                        <p className="capitalize">{field.name}</p>
                        <input type="text" {...field} className="border" />
                        {meta.touched && meta.error && (
                          <div className="text-red-600">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="description" validate={validateDescription}>
                    {({ field, form, meta }) => (
                      <div className="flex flex-col items-stretch">
                        <p className="capitalize">{field.name}</p>
                        <textarea
                          rows="5"
                          cols="33"
                          {...field}
                          className="border"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-600">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="price" validate={validatePrice}>
                    {({ field, form, meta }) => (
                      <div className="flex flex-col items-stretch">
                        <p className="capitalize">{field.name}</p>
                        <input
                          type="number"
                          type="text"
                          {...field}
                          className="border"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-600">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <ImageInput
                    setFieldValue={setFieldValue}
                    handleFiles={handleFiles}
                    listing={listingsMap[idToEdit]}
                  />
                  <button
                    type="submit"
                    className="mt-4 pt-2 pb-2 bg-blue-500 uppercase text-white"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}

export default ListingForm;
