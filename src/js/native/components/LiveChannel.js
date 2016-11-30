import React, {PropTypes} from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Link} from "react-router";
import Image from "./Image";
import {pickCurrentProgram} from "../../shared/utils/schedule";
import {timestampToTimeString, timePercentElapsedBetween} from "../../shared/utils/time";

const styles = StyleSheet.create({
	content: {
		width: 100,
		maxHeight: 120
	},
	image: {
		width: 80,
		height: 60,
		backgroundColor: "black"
	},
	text: {
		color: "white"
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

		this.onImagePress = this.onImagePress.bind(this);
	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	onImagePress() {
		this.props.onPress(this.props.id);
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
			<Text style={styles.text}>{this.state.program.title}</Text>
			<Text style={styles.text}>{this.state.program.time}</Text>
			<Text style={styles.text}>{this.state.program.elapsedPercent}</Text>
		</View> : <Text style={styles.text}>{"No Program"}</Text>;
	}

	renderChannelLogo() {
		const imageUrl = this.props.images.LOGO;
		const logo = (<Image
			style={styles.image}
			resizeMode={"cover"}
			source={imageUrl}
		/>);

		if (this.props.isLink) {
			return (<Link
				to={{
					pathname: "/tv",
					state: {from: this.props.linkReferer || "/"},
					query: {channelId: this.props.id}
				}}
			>{
				({transition}) => <TouchableOpacity
					onPress={transition}
				>
					{logo}
				</TouchableOpacity>
			}</Link>);
		}

		return (<TouchableOpacity
			onPress={this.onImagePress}
		>
			{logo}
		</TouchableOpacity>);
	}

	render() {
		return (<View style={[styles.content, this.props.style || {}]}>
			{this.renderChannelLogo()}
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
	),
	isLink: PropTypes.bool,
	linkReferer: PropTypes.string,

	/* invoked only if item is not a Link */
	onPress: PropTypes.func.isRequired,
	style: PropTypes.object
};

/* eslint-disable no-empty-function */
LiveChannel.defaultProps = {
	onPress: () => {}
};

export default LiveChannel;
