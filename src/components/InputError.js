import React from 'react';

export default function (meta) {
  if (meta.touched && meta.error)
    return <div className="text-red-600">{meta.error}</div>;
  return null;
}
