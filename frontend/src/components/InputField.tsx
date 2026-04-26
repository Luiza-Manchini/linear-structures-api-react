import type { InputHTMLAttributes } from "react";

export default function InputField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input-field" {...props} />;
}
