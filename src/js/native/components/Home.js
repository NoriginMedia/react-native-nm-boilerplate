import React, {PropTypes} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import Slideshow from "./Slideshow";
import Category from "./Category";
import LiveChannel from "./LiveChannel";
import Movie from "./Movie";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";

// import {staticBackground} from "../styles/animations";

import colors from "../../shared/styles/colors";

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: colors.background
	}
});

const Home = (props) => <View style={{flex: 1}}>
	<TopBar />
	<ScrollView
		style={styles.scrollView}
		showsVerticalScrollIndicator={false}
	>
		<Slideshow
			items={props.slides.length === 1 ? props.slides[0].contents : []}
		/>
		<Category
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
		/>)}
	</ScrollView>
	<BottomBarContainer component={BottomBar} />
</View>;

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
