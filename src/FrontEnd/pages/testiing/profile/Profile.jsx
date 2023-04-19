import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import styles from "./profile.module.css";
import AccordionStyles from "./Accordion.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword, updateProfile } from "../../../store/action/userAction";
import Loader from "../../../components/loader/Loader";

const Profile  = () => {
	const dispatch = useDispatch();
	const {user} = useSelector((state) =>  state.user);
	const {loading} = useSelector((state) =>  state.profile);
	
	useEffect(() => {
		if(user){
			setUserData({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone
			})
		}
	}, [user]);

	const [clicked, setClicked] = useState(false);

	const toggle = (index) => {
		if (clicked === index) {
			//if clicked question is already active, then close it
			return setClicked(null);
		}
		setClicked(index);
	};

	let [userData, setUserData] = useState({
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.email,
		phone: user?.phone
	});
	let [passwordData, setPasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: ""
	});

	let onUserDataInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

	let onPasswordDataInputChange = (e, field) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value,
    });
  };

	let onProfileUpdate = (e) => {
		e.preventDefault()
		if(!userData.firstName.match(/^[A-Za-z]+$/)){
			return toast.error("Firstname must be Alphabets");
		}
		if(!userData.lastName.match(/^[A-Za-z]+$/)){
			return toast.error("Lastname must be Alphabets");
		}
		if(!userData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			return toast.error("Enter valid email");
		}
		if(!userData.phone.match(/^[0-9]{10}$/)){
			return toast.error("Enter valid Phone number");
		}
		dispatch(updateProfile(userData))
	}

	let onPasswordUpdate = (e) => {
		e.preventDefault()
		if(passwordData.oldPassword == ""){
			return toast.error("Old password required");
		}
		if(passwordData.newPassword == ""){
			return toast.error("New password required");
		}
		if(passwordData.confirmPassword == ""){
			return toast.error("Confirm password required");
		}
		if(passwordData.newPassword != passwordData.confirmPassword){
			return toast.error("New password and Confirm password not match");
		}
		dispatch(updatePassword(passwordData))
	}


	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<section className={styles.hero}>
					<div className={styles.container}>

						<h4 className="pb-5">My Account</h4>

						<div className={AccordionStyles.Accordion_FAQs}>
							<div
								className={AccordionStyles.Wrap}
								onClick={() => toggle(0)}
							>
								<div className={AccordionStyles.Question}>
									<h5>Edit your account details</h5>
									<span>{clicked === 0 ? <FiMinus /> : <FiPlus />}</span>
								</div>
							</div>

							{clicked === 0 ? (
								<div className={AccordionStyles.Dropdown}>

									{/* <div className={styles.title}>Edit your account details</div> */}
									<div className={styles.content}>
										<form method="post">
											<div className={styles["user-details"]}>
												<div className={styles["input-box"]}>
													<span className={styles.details}>First Name</span>
													<input
														type="text"
														name="firstName"
														placeholder="First Name"
														defaultValue={userData.firstName}
                        		onChange={(e) => {
                          		onUserDataInputChange(e, "firstName");
														}}
													/>
												</div>
												<div className={styles["input-box"]}>
													<span className={styles.details}>Last Name</span>
													<input
														type="text"
														name="lastName"
														placeholder="Last Name"
														defaultValue={userData.lastName}
                        		onChange={(e) => {
                          		onUserDataInputChange(e, "lastName");
														}}
													/>
												</div>
												<div className={styles["input-box"]}>
													<span className={styles.details}>Email</span>
													<input
														type="email"
														name="email"
														placeholder="Email"
														defaultValue={userData.email}
                        		onChange={(e) => {
                          		onUserDataInputChange(e, "email");
														}}
													/>
												</div>
												<div className={styles["input-box"]}>
													<span className={styles.details}>Phone Number</span>
													<input
														name="phone"
														type="number"
														placeholder="Phone Number"
														defaultValue={userData.phone}
                        		onChange={(e) => {
                          		onUserDataInputChange(e, "phone");
														}}
														required
													/>
												</div>
											</div>
											<div className="text-center">
												<button className={styles.submit_btn} onClick={(e) => onProfileUpdate(e)}>Update</button>
											</div>
										</form>
									</div>

								</div>
							) : null}
						</div>

						<div className={AccordionStyles.Accordion_FAQs}>
							<div
								className={AccordionStyles.Wrap}
								onClick={() => toggle(1)}
							>
								<div className={AccordionStyles.Question}>
									<h5>Change your password</h5>
									<span>{clicked === 1 ? <FiMinus /> : <FiPlus />}</span>
								</div>
							</div>

							{clicked === 1 ? (
								<div className={AccordionStyles.Dropdown}>

									<div className={styles.content}>
										<form method="post">
											<div className={styles["user-details"]}>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>Old Password</span>
													<input
														type="text"
														name="oldPassword"
														placeholder="Old Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "oldPassword");
														}}
													/>
												</div>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>New Password</span>
													<input
														type="text"
														name="newPassword"
														placeholder="New Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "newPassword");
														}}
													/>
												</div>
												<div className={styles["input-box2"]}>
													<span className={styles.details}>Confirm Password</span>
													<input
														type="text"
														name="confirmPassword"
														placeholder="Confirm Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "confirmPassword");
														}}
													/>
												</div>
											</div>
											<div className="text-center">
												<button className={styles.submit_btn} onClick={(e) => onPasswordUpdate(e)}>Update</button>
											</div>
										</form>
									</div>

								</div>
							) : null}
						</div>

					</div>
				</section>
			)}
		</>
	);
};

export default Profile;
