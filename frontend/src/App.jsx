import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/index.jsx";
import Navbar from "./components/Navbar/index.jsx";
const App = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default App;
