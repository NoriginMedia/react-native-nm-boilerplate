import React, {PropTypes} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import Slideshow from "./Slideshow";
import CategorySlider from "./CategorySlider";
import LiveChannel from "./LiveChannel";
import Movie from "./Movie";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import {screenHeight} from "../utils/screen";
import {absoluteFlex} from "../../shared/styles/layout";
import {floatFromBottom} from "../styles/animations";

const styles = StyleSheet.create({
	scrollView: {
		flex: 1
	}
});

const getFadingStyle = ({fader, fadingIn, fadingOut}) => {
	let fadingStyle = {
		flex: 1
	};

	if (fadingIn) {
		fadingStyle = {
			...absoluteFlex,
			...floatFromBottom(fader, screenHeight)
		};
	} else if (fadingOut) {
		fadingStyle = {
			...absoluteFlex
		};
	}

	return fadingStyle;
};

const Home = (props) => <View
	style={{
		...getFadingStyle(props)
	}}
>
	<TopBar />
	<ScrollView
		style={styles.scrollView}
		showsVerticalScrollIndicator={false}
	>
		<Slideshow
			items={props.slides.length === 1 ? props.slides[0].contents : []}
		/>
		<CategorySlider
			key={"channels"}
			title={"Channels"}
			itemComponent={LiveChannel}
			items={props.channels}
		/>
		{props.categories.map((category, index) => <CategorySlider
			key={index}
			title={category.title}
			itemComponent={Movie}
			items={category.contents}
		/>)}
	</ScrollView>
	<BottomBar />
</View>;

Home.propTypes = {
	slides: PropTypes.arrayOf(PropTypes.shape({
		contents: PropTypes.array.isRequired
	})).isRequired,
	channels: PropTypes.array.isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		contents: PropTypes.array.isRequired
	})).isRequired,
	fader: PropTypes.number.isRequired,
	fadingIn: PropTypes.bool.isRequired,
	fadingOut: PropTypes.bool.isRequired
};

export default Home;
