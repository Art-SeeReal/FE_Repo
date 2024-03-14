import React, { ReactNode, FormEvent } from 'react';

interface Props {
  id: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}

const Form = ({ children, ...rest }: Props) => {
  return (
    <form noValidate {...rest}>
      {children}
    </form>
  );
};

export default Form;
