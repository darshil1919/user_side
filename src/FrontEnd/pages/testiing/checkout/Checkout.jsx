import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./checkout.css";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ErrorForm from "./ErrorForm";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors_cartDetails,
  getCartDetails,
} from "../../../store/action/cartAction";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const dispatch = useDispatch();

  const { error, loading, cart } = useSelector((state) => {
    return state.cartDetails;
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors_cartDetails());
    }

    dispatch(getCartDetails({ categoryName: category }));
  }, []);

  console.log("cart---------->", cart);

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Get current date and time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Generate time slots array based on selected date
  const generateTimeSlots = () => {
    const timeSlots = [];
    const selectedDateObj = new Date(selectedDate);
    const selectedDateHour = selectedDateObj.getHours();
    const startTime = new Date();
    if (selectedDateObj.toDateString() === now.toDateString()) {
      // If selected date is today, start from current time + 2 hours
      startTime.setHours(currentHour + 3, 0, 0, 0);
    } else if (
      selectedDateObj.toDateString() ===
      new Date(now.setDate(now.getDate() + 1)).toDateString()
    ) {
      // If selected date is tomorrow, start from 8:00 AM
      startTime.setHours(8, 0, 0, 0);
    } else {
      // For other dates, start from 8:00 AM
      startTime.setHours(8, 0, 0, 0);
    }
    const endTime = new Date();
    endTime.setHours(19, 30, 0, 0); // End time is 8 PM
    while (startTime <= endTime) {
      const time = startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      timeSlots.push(time);
      startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
    }
    return timeSlots;
  };

  // Generate dates array
  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate());
    for (let i = 0; i < 3; i++) {
      const date = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      dates.push(date);
      startDate.setDate(startDate.getDate() + 1); // Increment by 1 day
    }
    return dates;
  };

  // Event handler for time selection
  const handleTimeChange = (event) => {
    console.log("event.target.value--->", event.target.value);

    setSelectedTime(event.target.value);
  };

  // Event handler for date selection
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    console.log("selectedDate--->", selectedDate);
    setSelectedDate(selectedDate);
    // Reset selected time when date is changed
    setSelectedTime("");
  };

  // Submit handler for form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with selected time and date
    console.log("Selected Time:", selectedTime);
    console.log("Selected Date:", selectedDate);
  };

  let validationschema = yup.object({
    // fname: yup
    //   .string()
    //   .required("First Name Required")
    //   .matches(/^[a-zA-Z ]*$/, "First Name must Alphabet"),
    // lname: yup
    //   .string()
    //   .required("Last Name Required")
    //   .matches(/^[a-zA-Z ]*$/, "Last Name must Alphabet"),
    // email: yup
    //   .string()
    //   .email("Enter Valid Email")
    //   .required("Email is Required"),
    address: yup.string().required("Address is Required"),
    state: yup.string().required("State is Required"),
    city: yup
      .string()
      .required("City is Required")
      .matches(/^[a-zA-Z ]*$/, "city must Alphabet"),
    pinCode: yup.string().length(6, "Enter 6 Digit").required("PinCode is Required"),
    // date: yup.string().required("Select Date"),
    // time: yup.string().required("Select time"),
    date: yup
      .string()
      ./* required("Image is required"). */ test(
        "customValidation",
        "Select Date",
        (value) => {
          console.log("selectedDate----->", selectedDate.length == 0);
          if (selectedDate.length == 0) {
            return false;
          } else {
            return true;
          }
        }
      ),
    time: yup
      .string()
      ./* required("Image is required"). */ test(
        "customValidation",
        "Select time",
        (value) => {
          // console.log("selectedDate----->", selectedDate.length == 0);
          if (selectedTime.length == 0) {
            return false;
          } else {
            return true;
          }
        }
      ),
  });

  let onSubmitCheckout = (value) => {
    // console.log("date --==>>", e);
    let startTime = new Date(selectedDate + " " + selectedTime);
    let endTime = new Date(startTime.getTime() + cart.totalTime * 60000);
    let orderFee = 60;
    let tax = (cart?.subTotal) ? Math.round(cart?.subTotal * 5 / 100) : 0;
    let grandTotal = (cart?.subTotal) + tax + orderFee;
    let payload = {
      categoryId: cart?.cartData[0].items.categoryId,
      startTime: startTime,
      endTime: endTime,
      totalTime: cart?.totalTime,
      grandTotal: grandTotal,
      paymentMode: 'COD',
      tax: tax,
      subTotal: cart?.subTotal,
      orderFee: orderFee,
      serviceLocation: {
        address: value.address,
        city: value.city,
        state: value.state,
        pinCode: value.pinCode,
      },
      itemData: cart.cartData,
    }
    const config = { headers: { "Content-Type": "application/json" } };
    axios.post(`/api/v1/order/add`, payload, config)
      .then(res => {
        console.log(res);
        console.log(res.data.data);
        toast.success(res.data.data);
      }).catch((error) => {
        toast.error(error.response.data.message);
        console.log("error=>", error)
      })
    console.log("payload---->", payload);
    // console.log("selectedDateselectedDate------------>", new Date(selectedDate + " " + selectedTime));
    // console.log("selectedTime --==>>", selectedTime);
    // console.log("selectedDate --==>>", selectedDate);
  };

  let initialValues = {
    // fname: "",
    // lname: "",
    // email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    date: "",
    time: "",
  };

  return (
    <>
      <div className="custom-container px-5">
        <h1 className="text-center py-4">checkout</h1>
        <div className="row">
          <div className="col-md-7">
            <h4 className="mb-3">Address</h4>
            <Formik
              initialValues={initialValues}
              validationSchema={validationschema}
              onSubmit={onSubmitCheckout}
              enableReinitialize={true}
            >
              <Form
                id="checkout_form"
                // enctype="multipart/form-data"
                method="post"
                className="needs-validation checkout_form"
              // novalidate=""
              >
                {/* <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fname">First name</label>
                    <Field
                      type="text"
                      className="form-control check_user"
                      id="fname"
                      name="fname"
                      placeholder="First Name"
                    />
                    <ErrorForm name="fname" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lname">Last name</label>
                    <Field
                      type="text"
                      className="form-control check_user"
                      id="lname"
                      name="lname"
                      placeholder="Last Name"
                    />
                    <ErrorForm name="lname" />
                  </div>
                </div> */}

                {/* <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    className="form-control check_user"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required=""
                  />
                  <ErrorForm name="email" />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    className="form-control check_user"
                    id="address"
                    name="address"
                    placeholder="1234 Main St"
                    required=""
                  />
                  <ErrorForm name="address" />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="state">State</label>
                    <Field
                      type="text"
                      className="form-control check_user"
                      id="state"
                      name="state"
                      placeholder="state"
                      required=""
                    />
                    <ErrorForm name="state" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city">City</label>
                    <Field
                      type="text"
                      className="form-control check_user"
                      id="city"
                      name="city"
                      placeholder="city"
                      required=""
                    />
                    <ErrorForm name="city" />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="pinCode">PinCode</label>
                    <Field
                      type="text"
                      className="form-control check_user"
                      // pattern="[0-9]{6}"
                      id="pinCode"
                      name="pinCode"
                      placeholder="123456"
                    />
                    <ErrorForm name="pinCode" />
                  </div>
                </div>

                <hr className="mb-4" />
                <div className="time">
                  <h5>When should the professional arrive?</h5>
                  <p>Your service will take approx. <span className="fw-bold">{cart.totalTime}</span> Minutes</p>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="date">Select Date</label>
                      <Field
                        as="select"
                        className="form-select dateSelect"
                        value={selectedDate}
                        onChange={handleDateChange}
                        name="date"
                      >
                        <option value="">select date</option>
                        {generateDates().map((date) => (
                          <option key={date} value={date}>
                            {date}
                          </option>
                        ))}
                      </Field>
                      <ErrorForm name="date" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="">Select Time</label>
                      <Field
                        as="select"
                        className="form-select timeSelect"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        name="time"
                      >
                        <option value="">select Time</option>
                        {generateTimeSlots().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Field>
                      <ErrorForm name="time" />
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <button
                  type="submit"
                  className="btn font-bold p-2 checkout-btn"
                >
                  Proceed to checkout
                </button>
              </Form>
            </Formik>
          </div>
          <div className=" col-md-5 checkout-cart-total">
            <h4 className="mb-3">Cart Total</h4>
            <div className="checkout_cart_summary">
              <h4 className="d-flex justify-content-between">
                Product <span>Total</span>
              </h4>

              <ul>
                {cart?.cartData?.map((value, index) => {
                  return (
                    <li key={index} className="d-flex justify-content-between">
                      {value?.serviceData[0].serviceName} X {value?.items?.quantity} <span><span>&#8377; </span>{value?.serviceData[0].price * value?.items?.quantity}</span>
                    </li>
                  );
                })}
                {/* <li className="d-flex justify-content-between">
                  Samsome Notebook Pro 5 X 01 <span>$295.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  Aquet Drone D 420 X 02 <span>$550.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  Play Station X 22 X 01 <span>$295.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  Roxxe Headphone Z 75 X 01 <span>$110.00</span>
                </li> */}
              </ul>

              <p className="d-flex justify-content-between">
                Sub Total <span><span>&#8377; </span>{cart.subTotal}</span>
              </p>
              <p className="d-flex justify-content-between">
                Taxes and Fee(5%) <span><span>&#8377; </span>{(cart?.subTotal) ? Math.round(cart?.subTotal * 5 / 100) : 0}</span>
              </p>
              <p className="d-flex justify-content-between">
                Order Fee <span><span>&#8377; </span>60</span>
              </p>

              <h4 className="d-flex justify-content-between">
                Grand Total <span><span>&#8377; </span>{(cart?.subTotal) + ((cart?.subTotal) ? Math.round(cart?.subTotal * 5 / 100) : 0) + 60}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
