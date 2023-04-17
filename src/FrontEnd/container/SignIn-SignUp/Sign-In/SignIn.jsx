import { useEffect, useState } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../store/action/userAction";
import { Backdrop, CircularProgress } from "@mui/material";
const LOGIN_URL = "/login";

export const SignIn = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const initialvalue = {
    email: "",
    password: "",
  };

  let validationschema = yup.object({
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
    // .min(8, "8 Character is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "at least one letter, one number and one special character"),
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
  ];

  const handleSubmit = async (e) => {
    dispatch(login(e));
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <div className="SignInSignUp">
        <Formik
          className="SignInSignUpForm"
          initialValues={initialvalue}
          validationSchema={validationschema}
          onSubmit={handleSubmit}
        >
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
            <button type="submit" className="SignInSignUpButton">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      {(loading) ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> : null}
    </>
  );
};
