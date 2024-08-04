import { useParams } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { setCredentials } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import Button from "../../components/Button";
import { IoMdClose } from "react-icons/io";

const VerifyEmail = () => {
	const [openPopUp, setOpenPopUp] = useState(false);
	const params = useParams();
	const { token } = params;
	console.log(token ? token : null);

	return (
		<div className={styles.container}>
			<h2>Verify Your Account</h2>
			<p className={styles.caption}>
				Please provide your one time password to verify your account
			</p>
			<form className={styles.formContainer}>
				<label>Verification code (OTP)</label>
				<div className={styles.formData}>
					<input type="number" placeholder="Enter your OTP" />
				</div>

				<Button>Verify account</Button>
			</form>

			<p className={styles.caption} onClick={() => setOpenPopUp(true)}>
				Resend Verification code
			</p>

			{openPopUp && (
				<div className={styles.popup}>
					<IoMdClose
						size={30}
						onClick={() => setOpenPopUp(false)}
						className={styles.close}
					/>
					<form className={styles.formContainer}>
						<label>Get Verification code (OTP)</label>
						<div className={styles.formData}>
							<input type="email" placeholder="Enter your email" />
						</div>

						<Button>Get verification code </Button>
					</form>
				</div>
			)}
		</div>
	);
};

export default VerifyEmail;
