// @flow
import React, { useEffect } from 'react';

declare type ImageInputProps = {
  setFieldValue: Function,
  listing: Listing,
};

function handleFiles(file: File) {
  const preview = document.getElementById('preview');

  if (!preview) return;

  preview.innerHTML = '';
  const img = document.createElement('img');
  const src = URL.createObjectURL(file);
  img.src = src;
  img.className = 'border h-24';
  img.onload = () => {
    URL.revokeObjectURL(src);
  };
  preview.appendChild(img);
}

export default function ImageInput({
  setFieldValue,
  listing,
}: ImageInputProps) {
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
        onChange={(event) => {
          setFieldValue('picture', event.currentTarget.files[0]);
          handleFiles(event.currentTarget.files[0]);
        }}
      />
      <div id="preview" />
    </>
  );
}
