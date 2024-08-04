import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/index.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/index.jsx";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";
import Products from "./pages/Products/index.jsx";
import Cart from "./pages/Cart/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import Wishlist from "./pages/Wishlist/index.jsx";
import Orders from "./pages/Orders/index.jsx";
import OrderDetails from "./pages/OrderDetails/index.jsx";
import ProductDeatils from "./pages/ProductDeatils/index.jsx";
import Checkout from "./pages/Checkout/index.jsx";
import Congratulations from "./pages/Congratulations/index.jsx";
import VerifyEmail from "./pages/VerifyEmail/index.jsx";
import ForgotPassword from "./pages/ForgotPassword/index.jsx";
import ContactUs from "./pages/ContactUs/index.jsx";
import AboutUs from "./pages/AboutUs/index.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="/" element={<Home />} />
						<Route path="/privacypolicy" element={<PrivacyPolicy />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/products" element={<Products />} />
						<Route path="/products/:id" element={<ProductDeatils />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/wishlist" element={<Wishlist />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/orders/:id" element={<OrderDetails />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/congratulations" element={<Congratulations />} />
						<Route path="/verifyemail/:token" element={<VerifyEmail />} />
						<Route path="/verifyemail" element={<VerifyEmail />} />
						<Route path="/forgotpassword" element={<ForgotPassword />} />
						<Route path="/contactus" element={<ContactUs />} />
						<Route path="/aboutus" element={<AboutUs />} />
						<Route path="/admin/createproduct" element={<AboutUs />} />
						<Route path="/admin/products" element={<AboutUs />} />
						<Route path="/admin/orders" element={<AboutUs />} />
						<Route path="/admin/users" element={<AboutUs />} />
						<Route path="/admin/dashboard" element={<AboutUs />} />
					</Route>
				</Routes>
			</Router>
			<Toaster />
		</Provider>
	</>,
);
