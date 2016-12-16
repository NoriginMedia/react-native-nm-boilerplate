import React, {PropTypes} from "react";
import SlideshowItem from "./SlideshowItem";
import {horizontalFlex} from "../styles/layout";

const styles = {
	container: {

	},
	horizontalScroll: {
		...horizontalFlex,
		overflowX: "scroll"
	}
};

const Slideshow = (props) => <div style={styles.container}>
	<div style={styles.horizontalScroll}>
		{props.items.map((item, index) => <SlideshowItem key={index} {...item} />)}
	</div>
</div>;

Slideshow.propTypes = {
	items: PropTypes.array.isRequired
};

export default Slideshow;
