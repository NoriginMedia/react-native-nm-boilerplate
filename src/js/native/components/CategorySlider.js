import React, {PropTypes} from "react";
import {View, StyleSheet, ScrollView} from "react-native";

const styles = StyleSheet.create({
	container: {

	}
});

const CategorySlider = (props) => {
	const Item = props.itemComponent;

	return (<View style={styles.container}>
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{props.items.map((item, index) => <Item key={index} {...item} />)}
		</ScrollView>
	</View>);
};

CategorySlider.propTypes = {
	items: PropTypes.array.isRequired,
	itemComponent: PropTypes.func.isRequired
};

export default CategorySlider;
