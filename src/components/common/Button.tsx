import type { ButtonInterface } from "../../types/interface";

const Button = ({ type = "button", className, children }: ButtonInterface) => {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;