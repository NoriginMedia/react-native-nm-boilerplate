import React, {PropTypes} from "react";
import {View, Text} from "react-native";

const LiveChannel = (props) => <View>
	<Text>{props.title}</Text>
</View>;

LiveChannel.propTypes = {
	title: PropTypes.string.isRequired
};

export default LiveChannel;
