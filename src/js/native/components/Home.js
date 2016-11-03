import React, {PropTypes} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import Slideshow from "./Slideshow";
import CategorySlider from "./CategorySlider";
import LiveChannel from "./LiveChannel";
import Movie from "./Movie";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollView: {
		flex: 1
	}
});

const Home = (props) => <View style={styles.container}>
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
		title: PropTypes.string.isRequired
	})).isRequired
};

export default Home;
