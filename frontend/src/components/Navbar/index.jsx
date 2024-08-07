import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { CiMenuFries, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { removeCredentials } from "../../redux/features/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const { user, isLoggedIn } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const LogoutHandler = () => {
		dispatch(removeCredentials());
		toast.success("You logged out successfully");
	};
	const toggleMenu = () => {
		setShowMenu((prev) => !prev);
		setShowUserMenu(false);
	};
	const toggleUserMenu = () => {
		setShowMenu(false);

		setShowUserMenu((prev) => !prev);
	};
	return (
		<>
			<div className={styles.container}>
				<Link to="/">
					<h1>KupaFoods</h1>
				</Link>
				<div className={styles.menuIcon}>
					<div className={styles.cartIcon}>
						<Link to="/cart">
							<CiShoppingCart
								onClick={() => {
									setShowMenu(false);
									setShowUserMenu(false);
								}}
								size={24}
							/>
						</Link>
						<p className={styles.cartCount}>19</p>
					</div>
					{isLoggedIn ? (
						<img
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							src={user?.image}
							onClick={toggleUserMenu}
							alt="user image"
						/>
					) : (
						<CiUser size={24} onClick={toggleUserMenu} />
					)}
					<CiMenuFries size={24} onClick={toggleMenu} />
				</div>
			</div>
			{showMenu && (
				<div className={styles.navMenu}>
					<IoMdClose size={30} onClick={toggleMenu} className={styles.close} />
					<ul className={styles.menu}>
						<li onClick={toggleMenu}>
							<Link to="/">Home</Link>
						</li>
						<li onClick={toggleMenu}>
							<Link to="/products">Products</Link>
						</li>

						<li onClick={toggleMenu}>
							<Link to="/aboutus">About us</Link>
						</li>
						<li onClick={toggleMenu}>
							<Link to="/contactus">Contact us</Link>
						</li>
						<li onClick={toggleMenu}>
							<Link to="/privacypolicy">Terms and Data Policy</Link>
						</li>
					</ul>
				</div>
			)}
			{showUserMenu && (
				<div className={styles.navMenu}>
					<IoMdClose
						size={30}
						onClick={toggleUserMenu}
						className={styles.close}
					/>
					<ul className={styles.menu}>
						{isLoggedIn && (
							<>
								<li onClick={toggleUserMenu}>
									<CiUser size={24} color="white" style={{ color: "white" }} />
									<Link to="/profile">Profile</Link>
								</li>
								<li onClick={toggleUserMenu}>
									<Link to="/wishlist">Wishlist</Link>
								</li>
								<li onClick={toggleUserMenu}>
									<Link to="/cart">Cart</Link>
								</li>
								<li onClick={toggleUserMenu}>
									<Link to="/orders">Orders</Link>
								</li>
								{user.isAdmin && (
									<>
										<li onClick={toggleUserMenu}>
											<Link to="/admin/dashboard">Admin Dashboard</Link>
										</li>
										<li onClick={toggleUserMenu}>
											<Link to="/admin/createproduct">Create Product</Link>
										</li>
										<li onClick={toggleUserMenu}>
											<Link to="/admin/products">Manage Products</Link>
										</li>
										<li onClick={toggleUserMenu}>
											<Link to="/admin/users">Manage Users</Link>
										</li>
										<li onClick={toggleUserMenu}>
											<Link to="/admin/orders">Manage Orders</Link>
										</li>
									</>
								)}
								<li>
									<Button onClick={LogoutHandler}>Logout</Button>
								</li>
							</>
						)}
						{!isLoggedIn && (
							<>
								<li onClick={toggleUserMenu}>
									<Link to="/login">
										<Button>Login</Button>
									</Link>
								</li>
								<li onClick={toggleUserMenu}>
									<Link to="/register">
										<Button>Register</Button>
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default Navbar;
