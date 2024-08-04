import Button from "../Button";
import styles from "./Card.module.css";

const Card = () => {
	return (
		<div className={styles.slidercard}>
			<img className={styles.productimage} src="1.jpg" alt="product image" />
			<div className={styles.details}>
				<p>1 Litre Vegetable Oil</p>
				<p>#25,000</p>
			</div>
			<Button>Add to Cart</Button>
		</div>
	);
};

export default Card;
