import { LuLoader } from "react-icons/lu";
import styles from "./Button.module.css";

const Button = ({ children, isLoading }) => {
	return (
		<button type="submit" className={styles.button}>
			{isLoading ? <LuLoader size={24} color="white" /> : children}
		</button>
	);
};

export default Button;
