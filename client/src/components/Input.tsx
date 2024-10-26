import { forwardRef, Ref, ReactNode, ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  id?: string;
  label?: string;
  err?: string;
  hood?: ReactNode;
};

const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between"><label htmlFor={props.id}>{props.label}</label> <div>{props.hood}</div></div>
      <input {...props} ref={ref} className="border border-gray-500 rounded py-1 px-2 block w-full outline-current mt-1" />
      <div className="text-red-500 text-xs">{props.err}</div>
    </div>
  )
});

export default Input;
