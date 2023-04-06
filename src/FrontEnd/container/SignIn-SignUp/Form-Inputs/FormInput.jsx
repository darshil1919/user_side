import { Field, } from "formik";
import "./FormInput.css";
import InputError from "./InputError";

export const FormInput = (props) => {
  // const [focused, setFocused] = useState(false);
  // const { label, errorMessage, onChange, id, ...inputProps } = props;

  // const handleFocus = (e) => {
  //   setFocused(true);
  // };

  return (
    <>
      <div className="formInput">
        <label className="FormInputLabel">{props.label}</label>
        <Field
          className="FormInputInput"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
        />
        <InputError className="FormInputSpan" name={props.name} />
      </div>
    </>
  );
};
