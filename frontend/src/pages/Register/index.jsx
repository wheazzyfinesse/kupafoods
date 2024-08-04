import { useDispatch, useSelector } from "react-redux";
import styles from "./Register.module.css";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials, setLoading } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../redux/utils/zodSchema";
import { auth, googleProvider } from "../../redux/utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { LuLoader2 } from "react-icons/lu";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [register, { isLoading }] = useRegisterMutation();
	const { isLoggedIn, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const {
		register: registerInput,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const registerHandler = async (formData) => {
		console.log(formData);
		try {
			const response = await register(formData);
			if (response.error) {
				return toast.error(response.error.data);
			}
			console.log(response);
			dispatch(setCredentials(response.data.userInfo.username));
			localStorage.setItem("token", response.data.token);

			toast.success(
				`Hey ${response.data.userInfo.username}! Your registration was succesfull`,
			);
			navigate("/profile");
		} catch (error) {
			console.log(error);
			toast.error(error.data);
		}
	};
	const registerWithGoogleHandler = async () => {
		dispatch(setLoading(true));
		try {
			const res = await signInWithPopup(auth, googleProvider);

			const data = {
				email: res.user.email,
				username: res.user.displayName,
				image: res.user.photoURL,
				uid: res.user.uid,
				providerId: res.providerId,
			};
			const response = await register(data);
			if (response.error) {
				dispatch(setLoading(false));

				return toast.error(response.error.data);
			}
			dispatch(setCredentials(response.data.userInfo.username));
			localStorage.setItem("token", response.data.token);

			toast.success(
				`Hey ${response.data.userInfo.username}! Your registration was succesful`,
			);
			dispatch(setLoading(false));

			navigate("/profile");
		} catch (error) {
			if (error.code === "auth/popup-closed-by-user") {
				toast.error("You cancelled registration");
				dispatch(setLoading(false));
			} else {
				toast.error(error.data);

				console.log(error);
			}
		}
	};
	useEffect(() => {
		if (isLoggedIn) {
			console.log(isLoggedIn);
			navigate("/");
		}
	}, [isLoggedIn, navigate]);
	return (
		<div className={styles.container}>
			<h2>Register</h2>
			<p className={styles.caption}>Create an account and start shopping!</p>
			<div className={styles.socialAuth}>
				<p
					className={loading ? styles.disablegooglebtn : styles.google}
					onClick={registerWithGoogleHandler}
					aria-disabled={loading}
					role="button"
				>
					<FcGoogle size={20} />{" "}
					{loading ? <LuLoader2 size={24} /> : "Register with Google"}
				</p>
			</div>
			<p style={{ textAlign: "center" }}>OR</p>
			<form
				onSubmit={handleSubmit(registerHandler)}
				className={styles.formContainer}
			>
				<label>Full Name</label>
				{errors.username && (
					<span className="error">{errors.username.message}</span>
				)}
				<div className={styles.formData}>
					<input
						type="text"
						{...registerInput("username")}
						placeholder="Enter your Full Name"
					/>
				</div>

				<label>Email</label>
				{errors.email && <span className="error">{errors.email.message}</span>}
				<div className={styles.formData}>
					<input
						{...registerInput("email")}
						type="email"
						placeholder="Enter your email"
					/>
				</div>
				<label>Password</label>
				{errors.password && (
					<span className="error">{errors.password.message}</span>
				)}
				<div className={styles.formData}>
					<input
						{...registerInput("password")}
						type={showPassword ? "text" : "password"}
						placeholder="Enter your password"
					/>
					<span className={styles.obscureText}>
						{showPassword ? (
							<FaRegEye onClick={togglePasswordVisibility} />
						) : (
							<FaRegEyeSlash onClick={togglePasswordVisibility} />
						)}
					</span>
				</div>
				<label>Confirm password</label>
				{errors.confirmPassword && (
					<span className="error">{errors.confirmPassword.message}</span>
				)}
				<div className={styles.formData}>
					<input
						{...registerInput("confirmPassword")}
						type={showPassword ? "text" : "password"}
						placeholder="Confirm your password"
					/>
					<span className={styles.obscureText}>
						{showPassword ? (
							<FaRegEye onClick={togglePasswordVisibility} />
						) : (
							<FaRegEyeSlash onClick={togglePasswordVisibility} />
						)}
					</span>
				</div>
				<Button type="submit" isLoading={isLoading}>
					Register
				</Button>
			</form>

			<div className={styles.infoContainer}>
				<p>
					Already have an account?{" "}
					<Link to="/login" className={styles.caption}>
						Login
					</Link>
				</p>
				<p>
					<Link to="/forgotpassword" className={styles.caption}>
						Forgotten Password
					</Link>
				</p>

				<p className={styles.info}>
					By clicking Register, you agree to our
					<br />
					<Link to="/privacypolicy" className={styles.caption}>
						Terms & Data Policy
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
