import React, {PropTypes} from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Link} from "react-router";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";
import {pickCurrentProgram} from "../../shared/utils/schedule";
import {timestampToTimeString, timePercentElapsedBetween} from "../../shared/utils/time";

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	image: {
		width: screenWidth * 0.25,
		height: screenHeight * 0.1,
		backgroundColor: "black"
	}
});

class LiveChannel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			program: null
		};

		this.updateCurrentProgram = this.updateCurrentProgram.bind(this);
		this.timer = setInterval(this.updateCurrentProgram, 1000);
	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	updateCurrentProgram() {
		const currentProgram = this.props.schedules ? pickCurrentProgram(this.props.schedules) : null;

		if (currentProgram) {
			this.setState({program: {
				title: currentProgram.title,
				time: `${timestampToTimeString(currentProgram.start)} - ${timestampToTimeString(currentProgram.end)}`,
				elapsedPercent: timePercentElapsedBetween(currentProgram.start, currentProgram.end)
			}});
		} else {
			this.setState({
				program: null
			});
		}
	}

	renderOngoingProgram() {
		return this.state.program ? <View>
			<Text>{this.state.program.title}</Text>
			<Text>{this.state.program.time}</Text>
			<Text>{this.state.program.elapsedPercent}</Text>
		</View> : <Text>{"No Program"}</Text>;
	}

	render() {
		const imageUrl = this.props.images.LOGO;

		return (<View style={styles.content}>
			<Link
				to={{
					pathname: "/tv",
					state: {from: "home"},
					query: {channelId: this.props.id}
				}}
			>{
				({transition}) => <TouchableOpacity
					onPress={transition}
				>
					<Image
						style={styles.image}
						resizeMode={"cover"}
						source={imageUrl}
					/>
				</TouchableOpacity>
			}</Link>
			{this.renderOngoingProgram()}
		</View>);
	}
}

LiveChannel.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		LOGO: PropTypes.string
	}).isRequired,
	id: PropTypes.string.isRequired,
	schedules: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			start: PropTypes.number.isRequired,
			end: PropTypes.number.isRequired
		})
	)
};

export default LiveChannel;
