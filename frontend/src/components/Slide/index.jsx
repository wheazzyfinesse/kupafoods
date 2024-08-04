import Slider from "react-slick";
import Card from "../Card";

const Slide = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
	};
	return (
		<Slider {...settings}>
			<Card />
			<Card />
			<Card />
			<Card />
		</Slider>
	);
};

export default Slide;
