// @flow
import React from 'react';

declare type Props = {
  meta: Object,
};

export default function (props: Props) {
  const { meta } = props;
  if (meta.touched && meta.error)
    return <div className="text-red-600">{meta.error}</div>;
  return null;
}
