import React, {PropTypes} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";
import colors from "../../shared/styles/colors";
import {timestampToTimeString, timePercentElapsedBetween} from "../../shared/utils/time";
import ProgressBar from "./ProgressBar";

const styles = StyleSheet.create({
	image: {
		width: screenWidth,
		height: screenHeight * 0.35
	},
	logoWrapper: {
		position: "absolute",
		top: 0,
		right: 10
	},
	logo: {
		width: 50,
		height: 50
	},
	overlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: screenWidth,
		height: 80,
		backgroundColor: colors.primary,
		opacity: 0.9
	},
	overlayInfo: {
		flexDirection: "row"
	},
	playButtonWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		fontSize: 30,
		height: 30,
		color: "white"
	},
	descriptionWrapper: {
		flex: 3,
		paddingTop: 5
	},
	title: {
		fontWeight: "bold",
		color: "white",
		fontSize: 12
	},
	description: {
		color: "white",
		fontSize: 10
	},
	infoWrapper: {
		flex: 2,
		paddingTop: 5,
		height: 70,
		alignItems: "center"
	}
});

class SlideshowItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: 0
		};

		this.updateProgress = this.updateProgress.bind(this);
		this.timer = setInterval(this.updateProgress, 1000);
	}

	componentDidMount() {
		this.updateProgress();
	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	updateProgress() {
		this.setState({
			progress: timePercentElapsedBetween(this.props.start, this.props.end)
		});
	}

	render() {
		const imageUrl = this.props.images.CarouselLandscapeHeader;
		const logoUrl = this.props.channelInfo.images && this.props.channelInfo.images.LOGO;
		const timeInterval = `${timestampToTimeString(this.props.start)} - ${timestampToTimeString(this.props.end)}`;

		return (
			<Image
				style={styles.image}
				resizeMode={"cover"}
				source={imageUrl}
			>
				<View style={styles.logoWrapper}>
					<Image
						style={styles.logo}
						resizeMode={"contain"}
						source={logoUrl}
					/>
				</View>
				<View style={styles.overlay}>
					<ProgressBar percent={this.state.progress} />
					<View style={styles.overlayInfo}>
						<View style={styles.playButtonWrapper}>
							<Link
								to={{
									pathname: "/tv",
									query: {channelId: this.props.channelInfo.channelId}
								}}
							>{
								({transition}) => <TouchableOpacity onPress={transition}>
									<Icon style={styles.button} name={"play-circle-filled"} />
								</TouchableOpacity>
							}</Link>
						</View>
						<View style={styles.descriptionWrapper}>
							<Text
								style={styles.title}
								ellipsizeMode={"tail"}
								numberOfLines={1}
							>
								{this.props.title}
							</Text>
							<Text
								style={styles.description}
								ellipsizeMode={"tail"}
								numberOfLines={4}
							>
								{this.props.description}
							</Text>
						</View>
						<View style={styles.infoWrapper}>
							<Text style={styles.title}>{this.props.channelInfo.title}</Text>
							<Text style={styles.description}>
								{timeInterval}
							</Text>
							<Link
								to={{
									pathname: "/details/program",
									state: {from: "/"},
									query: {
										channelId: this.props.channelInfo.channelId,
										programId: this.props.id
									}
								}}
							>{
								({transition}) => <TouchableOpacity onPress={transition}>
									<Icon style={styles.button} name={"info"} />
								</TouchableOpacity>
							}</Link>
						</View>
					</View>
				</View>
			</Image>
		);
	}
}

SlideshowItem.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeHeader: PropTypes.string
	}).isRequired,
	id: PropTypes.string.isRequired,
	start: PropTypes.number.isRequired,
	end: PropTypes.number.isRequired,
	channelInfo: PropTypes.shape({
		title: PropTypes.string.isRequired,
		channelId: PropTypes.string.isRequired,
		images: PropTypes.shape({
			LOGO: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default SlideshowItem;
