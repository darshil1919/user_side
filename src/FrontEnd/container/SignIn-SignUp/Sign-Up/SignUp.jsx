import { useEffect, useState } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../store/action/userAction";

const SIGN_UP_URL = "/user/register";

export const SignUp = () => {
  const dispatch = useDispatch();
  const {error, loading, isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const [success, setSuccess] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if(error){
        console.log(error)
        dispatch(clearErrors())
    }
    if (isAuthenticated) {
        navigate("/")
    }
}, [dispatch, error, isAuthenticated, navigate])

  let initialValues={
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  }

  let validationschema = yup.object({
    firstName: yup
      .string()
      .required("First Name Required")
      .matches(/^[a-zA-Z ]*$/, "First Name must Alphabet"),
    lastName: yup
      .string()
      .required("Last Name Required")
      .matches(/^[a-zA-Z ]*$/, "Last Name must Alphabet"),
      email: yup
        .string()
        .email("Enter Valid Email")
        .required("Email is Required"),
        phone: yup
          .string()
          .matches(/^[0-9]{10}$/, "Enter Valid Number")
          .length(10, "Enter 10 digit")
          .required("Phone no. is Required"),
    password: yup.string().required("Password is Required"),
    // .min(8, "8 Character is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "at least one letter, one number and one special character"),
    confirmPassword: yup.string().required("Confirm password is required")
     .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First name",
      label: "Firstname",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      label: "Lastname",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
  ];

  const handleSubmit = async (e) => {
    let {firstName, lastName, email, phone, password} = e
    dispatch(register({firstName, lastName, email, phone, password}))
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  return (
    <div className="SignInSignUp">
      <Formik className="SignInSignUpForm"
      initialValues={initialValues}
      validationSchema={validationschema}
      onSubmit={handleSubmit}>
        <Form className="SignInSignUpForm">
        <div className="SignInSignUpTitle">Sign In</div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            // value={values[input.name]}
            // onChange={onChange}
          />
        ))}
        <button type="submit" className="SignInSignUpButton">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
