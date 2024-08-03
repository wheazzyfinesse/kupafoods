import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../../components/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../redux/utils/firebase";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [login, { isLoading, error }] = useLoginMutation();
	const { isLoggedIn, user } = useSelector((state) => state.user);
	console.log(user, isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const LoginUserHandler = async (formData) => {
		try {
			const response = await login(formData);
			if (response.error) {
				return toast.error(response.error.data);
			}
			dispatch(setCredentials(response.data.userInfo));
			localStorage.setItem("token", response.data.token);

			toast.success(
				`Hey ${response.data.userInfo.username}! You logged in succesfully`,
			);
			// navigate("/profile");
		} catch (error) {
			console.log(error);
			toast.error("Registration failed");
		}
	};

	const loginWithGoogleHandler = async () => {
		try {
			const res = await signInWithPopup(auth, googleProvider);

			const data = {
				email: res.user.email,
				username: res.user.displayName,
				image: res.user.photoURL,
				uid: res.user.uid,
				providerId: res.providerId,
			};
			const response = await login(data);
			if (response.error) {
				return toast.error(response.error.data);
			}
			console.log(response);
			dispatch(setCredentials(response.data.userInfo));
			localStorage.setItem("token", response.data.token);

			toast.success(
				`Hey ${response.data.userInfo.username}! You logged in succesfully`,
			);
			navigate("/profile");
		} catch (error) {
			console.log(error);
			toast.error(error.data);
		}
	};

	useEffect(() => {
		if (user) {
			console.log(user);
			navigate("/");
		}
	}, [user, navigate]);
	return (
		<div className={styles.container}>
			<h2>Login</h2>
			<p className={styles.caption}>login to your account to start shopping</p>
			<form onSubmit={LoginUserHandler} className={styles.formContainer}>
				<label>Email</label>
				<div className={styles.formData}>
					<input type="email" placeholder="Enter your email" />
				</div>
				<label>Password</label>
				<div className={styles.formData}>
					<input
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

				<Button isLoading={isLoading}>Login</Button>
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
					<Link to="/forgotpassword" className={styles.caption}>
						Forgotten Password
					</Link>
				</p>

				<p className={styles.info}>OR</p>
			</div>
			<div className={styles.socialAuth}>
				<p className="google" onClick={loginWithGoogleHandler}>
					<FcGoogle size={20} /> Login with Google
				</p>
			</div>
		</div>
	);
};

export default Login;
