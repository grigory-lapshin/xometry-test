//@flow
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// $FlowFixMe;
import { nanoid } from "nanoid";

import Modal from "react-modal";
import { useStoreon } from "storeon/react";

Modal.setAppElement("#root");

function Form() {
  const { dispatch, listings, idToEdit } = useStoreon("listings", "idToEdit");

  useEffect(() => {
    if (idToEdit !== null) setIsModalOpen(true);
  }, [idToEdit]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function create() {
    dispatch("create", {
      id: nanoid(),
      title: "test-storeon",
      price: Math.round(Math.random() * 100)
    });
    setIsModalOpen(false);
  }

  function update() {
    dispatch("update", { id: idToEdit });
    closeForm();
  }

  function closeForm() {
    dispatch("resetIdToEdit");
    setIsModalOpen(false);
  }

  function openForm() {
    setIsModalOpen(true);
  }

  return (
    <>
      <button onClick={openForm}>create</button>
      <Modal isOpen={isModalOpen} contentLabel="Example Modal">
        <button onClick={() => setIsModalOpen(false)}>close</button>
        <div>I am a modal</div>
        {idToEdit === null ? (
          <button onClick={create}>create new</button>
        ) : (
          <>
            <span>{`listing-${idToEdit}`}</span>
            <button onClick={update}>save</button>
          </>
        )}
      </Modal>
    </>
  );
}

export default Form;
