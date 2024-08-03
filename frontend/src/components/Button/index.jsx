import { LuLoader } from "react-icons/lu";
import styles from "./Button.module.css";

const Button = ({ type, children, isLoading, onClick }) => {
	return (
		<button
			type={type}
			disabled={isLoading}
			className={styles.button}
			onClick={onClick}
		>
			{isLoading ? <LuLoader size={24} color="" /> : children}
		</button>
	);
};

export default Button;
