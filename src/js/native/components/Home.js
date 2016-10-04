import React, {PropTypes} from "react";
import {View, Text} from "react-native";

const Home = (props) => <View>
	<Text>{props.test}</Text>
</View>;

Home.propTypes = {
	test: PropTypes.string
};

export default Home;
