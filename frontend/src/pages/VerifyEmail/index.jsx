import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./VerifyEmail.module.css";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../../components/Button";
import { LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const VerifyEmail = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [login, { isLoading, error }] = useLoginMutation();
	const dispatch = useDispatch();
	const params = useParams();
	const { token } = params;
	console.log(token ? token : null);

	const LoginUserHandler = async () => {
		// try {
		// 	const res = await login(formData);
		// 	dispatch(setCredentials(res));
		// 	toast.success("Registered succesfully");
		// } catch (error) {
		// 	console.log(error);
		// 	toast.error("Registration failed");
		// }
	};

	return (
		<div className={styles.container}>
			<h2>Verify Your Account</h2>
			<p className={styles.caption}>
				Please provide your one time password to verify your account
			</p>
			<form onSubmit={LoginUserHandler} className={styles.formContainer}>
				<label>Verification code (OTP)</label>
				<div className={styles.formData}>
					<input type="email" placeholder="Enter your email" />
				</div>

				<Button isLoading={isLoading}>Verify account</Button>
				{error && <p>{error.message}</p>}
			</form>

			<div className={styles.infoContainer}>
				<p>
					Don&apos;t have an account?{" "}
					<Link to="/register" className={styles.caption}>
						Register
					</Link>
				</p>
				<p>
					Remember password to your account?{" "}
					<Link to="/login" className={styles.caption}>
						Login
					</Link>
				</p>

				<p className={styles.info}>OR</p>
			</div>
			<div className={styles.socialAuth}>
				<p className="google">
					<FcGoogle size={20} /> Login/Register with Google
				</p>
			</div>
		</div>
	);
};

export default VerifyEmail;
