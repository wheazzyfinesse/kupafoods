import Button from "../Button";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
	return (
		<div className={styles.newsletter}>
			<h2>Subscribe to our newsletter</h2>
			<p>Stay up-to-date with the latest trends and offers</p>
			<input type="email" placeholder="Please enter your email" />
			<Button>Subscribe</Button>
		</div>
	);
};

export default Newsletter;
