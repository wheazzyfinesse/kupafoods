import Button from "../Button";
import styles from "./Contactus.module.css";

const Contactus = () => {
	return (
		<>
			<h2 className={styles.title}>Contact Us</h2>
			<form className={styles.container}>
				<label htmlFor="name">Name</label>
				<input type="text" placeholder="Enter your name" />
				<label htmlFor="email">Email</label>
				<input type="email" placeholder="Enter your email" />
				<textarea placeholder="Please enter your message" />
				<Button>Send</Button>
			</form>
		</>
	);
};

export default Contactus;
