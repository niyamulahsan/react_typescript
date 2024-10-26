import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  label?: string;
  icon?: ReactNode;
}

const Button: React.FC<Props> = (props) => {
  return (
    <>
      <button {...props} className={props.className}>
        <span className={props.icon ? 'pe-1' : ''}>{props.label}</span> <span>{props.icon}</span>
      </button >
    </>
  );
};

export default Button;
