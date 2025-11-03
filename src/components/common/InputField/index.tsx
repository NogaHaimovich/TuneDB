import "./styles.scss";
import type { InputProps } from "../../../types/components";

const InputField = ({ type = "text", placeholder, error, ...props }: InputProps) => {
  return (
    <div className="ui-input">
      <input type={type} placeholder={placeholder} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
