import { LuSearch } from "react-icons/lu";
import styles from "./Home.module.css";
import Button from "../../components/Button/index";
import { Link } from "react-router-dom";
import Slide from "../../components/Slide";
import Newsletter from "../../components/Newsletter";
import Contactus from "../../components/Contactus";
const Home = () => {
	return (
		<div className={styles.container}>
			<form className={styles.formContainer}>
				<input placeholder="Search for your favorite products" />

				<LuSearch size={24} color="teal" />
			</form>
			<div className={styles.heroCard}>
				<div className={styles.heroContent}>
					<h2>Discover Our Top products</h2>
					<p>10% Dioscount for new users</p>
					<Link to="/products">
						<Button>Order Now</Button>
					</Link>
				</div>
				<img
					src="/1.jpg"
					// src="https://i.pinimg.com/564x/2f/61/43/2f61438a14be805cf14548ce71cdcee8.jpg"
					alt="hero image"
					className={styles.hero}
				/>
			</div>
			<ul className={styles.category}>
				<li>Vegetabale Oil</li>
				<li>Rice</li>
				<li>Frozen food</li>
				<li>Pasta</li>
				<li>Water</li>
			</ul>
			<Slide />
			<Newsletter />
			<Contactus />
		</div>
	);
};

export default Home;
