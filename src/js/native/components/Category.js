import React, {PropTypes} from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	header: {
		height: 40,
		paddingTop: 15,
		paddingBottom: 5,
		paddingLeft: 10,
		justifyContent: "center"
	},
	headerText: {
		color: "white",
		fontWeight: "bold"
	}
});

class Category extends React.Component {
	constructor(props) {
		super(props);

		this.onItemPress = this.onItemPress.bind(this);
	}

	onItemPress(args) {
		this.props.onItemPress(args);
	}

	renderItemsContainer() {
		const Item = this.props.itemComponent;
		const items = this.props.items.map((item, index) => <Item
			key={index}
			isLink={this.props.itemsAreLinks}
			linkReferer={this.props.itemLinkReferer}
			onPress={this.onItemPress}
			style={this.props.itemStyle}
			isSelected={this.props.selectedItem === item.id}
			{...item}
		/>);

		if (this.props.horizontalScroll) {
			return (<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{items}
			</ScrollView>);
		}

		return (<ScrollView>
			{items}
		</ScrollView>);
	}

	render() {
		return (<View style={styles.content}>
			{this.props.title ? <View style={styles.header}>
				<Text style={styles.headerText}>
					{this.props.title}
				</Text>
			</View> : null}
			{this.renderItemsContainer()}
		</View>);
	}
}

Category.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	})).isRequired,
	itemComponent: PropTypes.func.isRequired,
	itemsAreLinks: PropTypes.bool,
	itemLinkReferer: PropTypes.string,
	horizontalScroll: PropTypes.bool,
	onItemPress: PropTypes.func,
	itemStyle: PropTypes.object,
	selectedItem: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

/* eslint-disable no-empty-function */
Category.defaultProps = {
	onItemPress: () => {}
};

export default Category;
