import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials, setLoading } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../redux/utils/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseSchema } from "../../redux/utils/zodSchema";
import { LuLoader2 } from "react-icons/lu";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [login, { isLoading, error }] = useLoginMutation();
	const { isLoggedIn, loading } = useSelector((state) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(baseSchema),
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const LoginUserHandler = async (formData) => {
		console.log(formData);
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
			dispatch(setLoading(false));

			navigate("/profile");
		} catch (error) {
			if (error.code === "auth/popup-closed-by-user") {
				toast.error("You cancelled login");
				dispatch(setLoading(false));
			} else {
				toast.error(error.data);

				console.log(error);
			}
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);
	return (
		<div className={styles.container}>
			<h2>Login</h2>
			<p className={styles.caption}>Login to your account to start shopping</p>
			<div className={styles.socialAuth}>
				<p
					className={`${loading ? "disablegooglebtn" : ""} google`}
					onClick={loginWithGoogleHandler}
					aria-disabled={loading}
					role="button"
				>
					<FcGoogle size={20} />{" "}
					{loading ? <LuLoader2 size={24} /> : "Login with Google"}
				</p>
			</div>
			<p className={styles.info}>OR</p>
			<form
				onSubmit={handleSubmit(LoginUserHandler)}
				className={styles.formContainer}
			>
				<label>Email</label>
				{errors.email && <p className="error">{errors.email.message}</p>}
				<div className={styles.formData}>
					<input
						{...register("email")}
						type="email"
						placeholder="Enter your email"
					/>
				</div>
				<label>Password</label>
				{errors.password && <p className="error">{errors.password.message}</p>}

				<div className={styles.formData}>
					<input
						{...register("password")}
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

				<Button type="submit" isLoading={isLoading}>
					Login
				</Button>
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
			</div>
		</div>
	);
};

export default Login;
