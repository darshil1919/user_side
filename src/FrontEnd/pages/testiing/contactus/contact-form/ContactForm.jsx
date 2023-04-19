import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactFormStyles from "./ContactForm.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const ContactForm = () => {
  // const form = useRef();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: ""
  })

  let onInputChange = (e, field) => {
    setData({
      ...data,
      [field]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if(data.name == ""){
			return toast.error("Name is required");
		}
		if(data.email == ""){
			return toast.error("Email is required");
		}
		if(!data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			return toast.error("Enter valid email");
		}
    if(data.message == ""){
			return toast.error("Message is required");
		}
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`/api/v1/contactUs/add`, {...data, contactType: "user" }, config)
      .then((res) => {
        // console.log(res);
        console.log(res.data.data);
        toast.success(res.data.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log("error=>", error);
      });
    setData({
      name: "",
      email: "",
      message: ""
    })
  };
  return (
    <div className={ContactFormStyles.contact}>
      <div className={ContactFormStyles.contact_box}>
        <div className={ContactFormStyles.contact_links}>
          <h2>CONTACT US</h2>
          <div className={ContactFormStyles.links}>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                  alt="linkedin"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/YCV2QBJg/github.png"
                  alt="github"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/W4Znvrry/codepen.png"
                  alt="codepen"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/NjLfyjPB/email.png"
                  alt="email"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={ContactFormStyles.contact_form_wrapper}>
          <form method="post" onSubmit={sendEmail}>
            <div className={ContactFormStyles.form_item}>
              <input type="text" name="name" value={data.name} onChange={(e) => {onInputChange(e, "name")}} />
              <label>Name:</label>
            </div>
            <div className={ContactFormStyles.form_item}>
              <input type="text" name="email" value={data.email} onChange={(e) => {onInputChange(e, "email")}} />
              <label>Email:</label>
            </div>
            <div className={ContactFormStyles.form_item}>
              <textarea className="" name="message" value={data.message} onChange={(e) => {onInputChange(e, "message")}}></textarea>
              <label>Message:</label>
            </div>
            <button
              type="submit"
              value="Send"
              className={ContactFormStyles.submit_btn}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
