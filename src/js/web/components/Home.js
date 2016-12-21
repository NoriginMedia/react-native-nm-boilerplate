import React, {PropTypes} from "react";
import Slideshow from "./Slideshow";

// import Category from "./Category";
// import LiveChannel from "./LiveChannel";
// import Movie from "./Movie";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import {verticalFlex} from "../styles/layout";

const styles = {
	content: {
		...verticalFlex,
		flex: 1
	},
	verticalScroll: {
		flex: 1,
		maxWidth: 800,
		alignSelf: "center",
		overflowY: "scroll"
	}
};

const Home = (props) => <div style={styles.content}>
	<TopBar />
	<div style={styles.verticalScroll}>
		<Slideshow
			items={props.slides.length === 1 ? props.slides[0].contents : []}
		/>
		{/*		<Category
			key={"channels"}
			title={"Channels"}
			itemComponent={LiveChannel}
			items={props.channels}
			itemsAreLinks
			itemLinkReferer={"/"}
			horizontalScroll
		/>
		{props.categories.map((category, index) => <Category
			key={index}
			title={category.title}
			itemComponent={Movie}
			items={category.contents}
			itemsAreLinks
			itemLinkReferer={"/"}
			horizontalScroll
		/>)}*/}
	</div>
	<BottomBarContainer component={BottomBar} />
</div>;

Home.propTypes = {
	slides: PropTypes.arrayOf(PropTypes.shape({
		contents: PropTypes.array.isRequired
	})).isRequired,
	channels: PropTypes.array.isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		contents: PropTypes.array.isRequired
	})).isRequired
};

export default Home;
