// @flow
import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Storeon from 'storeon/react';
import ImageInput from './ImageInput';
import InputContainer from './InputContainer';
import {
  validateTitle,
  validateDescription,
  validatePrice,
} from '../utils/validators';

const { useStoreon }: any = Storeon;

Modal.setAppElement('#root');

function ListingForm() {
  const { dispatch, listingsMap, idToEdit } = useStoreon(
    'listingsMap',
    'idToEdit',
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (idToEdit !== null) setIsModalOpen(true);
  }, [idToEdit]);

  function create(listing) {
    dispatch('create', listing);
  }

  function update(listing) {
    dispatch('update', { ...listing, id: idToEdit });
  }

  function closeForm() {
    dispatch('resetIdToEdit');
    setIsModalOpen(false);
  }

  function openForm() {
    setIsModalOpen(true);
  }

  function onSubmit(values) {
    if (idToEdit === null) create(values);
    else if (idToEdit !== null) update(values);
    closeForm();
  }

  return (
    <>
      <div className="flex flex-row flex-no-wrap items-center">
        <div className="flex flex-grow">
          <h1 className="text-5xl">Listings</h1>
        </div>
        <button
          type="button"
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
              type="button"
              onClick={closeForm}
              className="text-right pl-6 pr-4 text-2xl"
            >
              ×
            </button>
          </div>
          <Formik
            initialValues={
              idToEdit === null
                ? { title: '', description: '', price: '' }
                : { ...listingsMap[idToEdit] }
            }
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1 gap-2 p-4">
                  <Field name="title" validate={validateTitle}>
                    {({ field, meta }) => (
                      <InputContainer name={field.name} meta={meta}>
                        <input type="text" {...field} className="border" />
                      </InputContainer>
                    )}
                  </Field>
                  <Field name="description" validate={validateDescription}>
                    {({ field, meta }) => (
                      <InputContainer name={field.name} meta={meta}>
                        <textarea
                          rows="5"
                          cols="33"
                          {...field}
                          className="border"
                        />
                      </InputContainer>
                    )}
                  </Field>
                  <Field name="price" validate={validatePrice}>
                    {({ field, meta }) => (
                      <InputContainer name={field.name} meta={meta}>
                        <input type="number" {...field} className="border" />
                      </InputContainer>
                    )}
                  </Field>
                  <ImageInput
                    setFieldValue={setFieldValue}
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
