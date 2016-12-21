import React, {PropTypes} from "react";
import {Link} from "react-router";
import Icon from "./Icon";
import Image from "./Image";
import colors from "../../shared/styles/colors";
import {timestampToTimeString, timePercentElapsedBetween} from "../../shared/utils/time";
import ProgressBar from "./ProgressBar";
import {horizontalFlex} from "../styles/layout";

const styles = {
	image: {
		minWidth: 800,
		minHeight: 450,
		position: "relative",
		overflow: "hidden"
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
		width: 800,
		height: 80,
		backgroundColor: colors.primary,
		opacity: 0.9
	},
	overlayInfo: {
		...horizontalFlex
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
};

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
				source={imageUrl}
			>
				<div style={styles.logoWrapper}>
					<Image
						style={styles.logo}
						source={logoUrl}
					/>
				</div>
				<div style={styles.overlay}>
					<ProgressBar percent={this.state.progress} />
					<div style={styles.overlayInfo}>
						<div style={styles.playButtonWrapper}>
							<Link
								to={{
									pathname: "/tv",
									query: {channelId: this.props.channelInfo.channelId}
								}}
							>{
								({transition}) => <div onClick={transition}>
									<Icon style={styles.button} name={"play-circle-filled"} />
								</div>
							}</Link>
						</div>
						<div style={styles.descriptionWrapper}>
							<div style={styles.title}>
								{this.props.title}
							</div>
							<div style={styles.description}>
								{this.props.description}
							</div>
						</div>
						<div style={styles.infoWrapper}>
							<div style={styles.title}>{this.props.channelInfo.title}</div>
							<div style={styles.description}>
								{timeInterval}
							</div>
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
								({transition}) => <div onClick={transition}>
									<Icon style={styles.button} name={"info"} />
								</div>
							}</Link>
						</div>
					</div>
				</div>
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
