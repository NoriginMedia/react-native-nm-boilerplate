import React, {PropTypes} from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Link} from "react-router";
import Image from "./Image";
import {pickCurrentProgram} from "../../shared/utils/schedule";
import {timestampToTimeString, timePercentElapsedBetween} from "../../shared/utils/time";
import ProgressBar from "./ProgressBar";
import colors from "../../shared/styles/colors";

const styles = StyleSheet.create({
	content: {
		width: 150,
		maxHeight: 150,
		paddingLeft: 5,
		paddingRight: 5
	},
	logoBackground: {
		width: 140,
		height: 90
	},
	logo: {
		position: "absolute",
		left: 5,
		bottom: 5,
		width: 45,
		height: 30
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 12
	},
	time: {
		color: "white",
		fontSize: 10,
		paddingBottom: 5
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

	componentDidMount() {
		this.updateCurrentProgram();
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
			<Text
				ellipsizeMode={"tail"}
				numberOfLines={1}
				style={styles.title}
			>
				{this.state.program.title}
			</Text>
			<Text style={styles.time}>{this.state.program.time}</Text>
		</View> : <Text style={styles.title}>{"No Program"}</Text>;
	}

	renderChannelLogo() {
		const imageUrl = this.props.images.LOGO;
		const logo = (<Image
			style={styles.logo}
			resizeMode={"contain"}
			source={imageUrl}
		/>);

		/* eslint-disable global-require */
		const image = (<Image
			source={require("../../../resources/images/Live-TV-placeholder.png")}
			resizeMode={"contain"}
			style={styles.logoBackground}
		>
			{logo}
		</Image>);

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
					{image}
				</TouchableOpacity>
			}</Link>);
		}

		return (<TouchableOpacity
			onPress={this.onImagePress}
		>
			{image}
		</TouchableOpacity>);
	}

	render() {
		return (<View
			style={[
				styles.content,
				this.props.style || {},
				this.props.isSelected ? {
					backgroundColor: colors.secondary
				} : {}
			]}
		>
			{this.renderChannelLogo()}
			<ProgressBar percent={(this.state.program && this.state.program.elapsedPercent) || 0} />
			{this.renderOngoingProgram()}
		</View>);
	}
}

LiveChannel.propTypes = {
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
	style: PropTypes.object,
	isSelected: PropTypes.bool
};

/* eslint-disable no-empty-function */
LiveChannel.defaultProps = {
	onPress: () => {}
};

export default LiveChannel;
