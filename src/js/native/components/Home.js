import React, {PropTypes} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import Slideshow from "./Slideshow";
import CategorySlider from "./CategorySlider";
import LiveChannel from "./LiveChannel";
import Movie from "./Movie";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollView: {
		flex: 1
	}
});

const Home = (props) => <View style={styles.container}>
	<ScrollView
		style={styles.scrollView}
		showsVerticalScrollIndicator={false}
	>
		<Slideshow
			items={props.slides.length === 1 ? props.slides[0].contents : []}
		/>
		<CategorySlider
			itemComponent={LiveChannel}
			items={props.channels}
		/>
		{props.categories.map((category, index) => <CategorySlider
			key={index}
			itemComponent={Movie}
			items={category.contents}
		/>)}
	</ScrollView>
</View>;

Home.propTypes = {
	slides: PropTypes.array.isRequired,
	channels: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired
};

export default Home;
