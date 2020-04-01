// @flow
import * as React from 'react';

import InputError from './InputError';

declare type InputContainerProps = {
  name: string,
  meta: Object,
  children: React.Node,
};

export default function InputContainer({
  name,
  meta,
  children,
}: InputContainerProps) {
  return (
    <div className="flex flex-col items-stretch">
      <p className="capitalize">{name}</p>
      {children}
      <InputError meta={meta} />
    </div>
  );
}
