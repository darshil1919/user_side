import React, { useState } from 'react';
import styles from "./profile.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../../store/action/userAction';
import { useDispatch } from 'react-redux';

const Resetpassword = () => {
	const {token} = useParams();
	const dispatch = useDispatch();
	let [passwordData, setPasswordData] = useState({
		newPassword: "",
		confirmPassword: ""
	});

	let onPasswordDataInputChange = (e, field) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value,
    });
  };

	let onPasswordUpdate = (e) => {
		e.preventDefault()
		if(passwordData.newPassword == ""){
			return toast.error("New password required");
		}
		if(passwordData.confirmPassword == ""){
			return toast.error("Confirm password required");
		}
		if(passwordData.newPassword != passwordData.confirmPassword){
			return toast.error("New password and Confirm password not match");
		}
		dispatch(resetPassword({
			resetPasswordToken: token,
			password: passwordData.newPassword,
			confirmPassword: passwordData.confirmPassword
		}))
	}


  return (
    <>
      <section className={styles.hero}>
					<div className={styles.container}>

						<h4 className="pb-5">Reset Password</h4>
						{/* <div className={AccordionStyles.Accordion_FAQs}> */}
							{/* <div
								className={AccordionStyles.Wrap}
								onClick={() => toggle(1)}
							>
								<div className={AccordionStyles.Question}>
									<h5>Change your password</h5>
									<span>{clicked === 1 ? <FiMinus /> : <FiPlus />}</span>
								</div>
							</div> */}

							{/* {clicked === 1 ? ( */}
								{/* <div className={AccordionStyles.Dropdown}> */}

									<div className={styles.content}>
										<form method="post">
											<div className={styles["user-details"]}>
												{/* <div className={styles["input-box2"]}>
													<span className={styles.details}>Old Password</span>
													<input
														type="text"
														name="oldPassword"
														placeholder="Old Password"
														onChange={(e) => {
                          		onPasswordDataInputChange(e, "oldPassword");
														}}
													/>
												</div> */}
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
							{/* ) : null} */}
						{/* </div> */}

					{/* </div> */}
				</section>
    </>
  )
}

export default Resetpassword;