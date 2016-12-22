import React, {PropTypes} from "react";
import {Link} from "react-router";
import Icon from "./Icon";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import Image from "./Image";
import {timePercentElapsedBetween, timestampToTimeString, timestampToDayString} from "../../shared/utils/time";
import colors from "../../shared/styles/colors";
import ProgressBar from "./ProgressBar";
import iconKeys from "../../shared/styles/iconKeys";
import {horizontalFlex, verticalFlex} from "../styles/layout";

const styles = {
	wrapper: {
		...verticalFlex,
		flex: 1
	},
	content: {
		...verticalFlex,
		flex: 1,
		backgroundColor: colors.background
	},
	scrollContent: {
		...horizontalFlex,
		width: 800,
		alignSelf: "center",
		overflowY: "scroll"
	},
	leftSection: {
		flex: 3
	},
	imageWrapper: {
		padding: 10
	},
	image: {
		height: 250,
		width: 400
	},
	title: {
		padding: 5,
		color: "white",
		fontWeight: "bold"
	},
	description: {
		padding: 5,
		color: "white",
		fontSize: 10
	},
	rightSection: {
		flex: 2
	},
	logoWrapper: {
		padding: 10
	},
	logo: {
		height: 60
	},
	timeWrapper: {
		padding: 10
	},
	time: {
		color: "white",
		fontSize: 11
	},
	buttons: {
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20
	},
	button: {
		backgroundColor: colors.accent,
		...horizontalFlex,
		justifyContent: "space-around",
		paddingLeft: 10,
		paddingTop: 3,
		paddingBottom: 3,
		paddingRight: 5
	},
	buttonTextWrapper: {
		...horizontalFlex,
		justifyContent: "space-around",
		alignItems: "center"
	},
	buttonText: {
		color: "white",
		fontWeight: "bold"
	},
	buttonIcon: {
		color: "white",
		fontSize: 24
	},
	devicesLabel: {
		padding: 5
	},
	devices: {
		...horizontalFlex,
		flexWrap: "wrap"
	},
	device: {
		padding: 1,
		color: "white",
		fontSize: 20
	}
};

const DetailsProgram = (props) => {
	const program = props.program;
	const imageUrl = (program.images && program.images.CarouselLandscapeHeader) || "";
	const logoUrl = (program.channelInfo &&
		program.channelInfo.images &&
		program.channelInfo.images.LOGO) || "";
	const startTime = timestampToTimeString(program.start);
	const endTime = timestampToTimeString(program.end);
	const day = timestampToDayString(program.start);

	return (<div style={styles.wrapper}>
		<TopBar
			leftButtonPath={(props.location.state && props.location.state.from) || "/"}
			leftButtonReferer={"details"}
		/>
		<div style={styles.content}>
			<div style={styles.scrollContent}>
				<div style={styles.leftSection}>
					<div style={styles.imageWrapper}>
						<Image
							style={styles.image}
							resizeMode={"contain"}
							source={imageUrl}
						/>
					</div>
					<div>
						<div style={styles.title}>
							{program.title || ""}
						</div>
					</div>
					<div>
						<div style={styles.description}>
							{program.description || ""}
						</div>
					</div>
				</div>
				<div style={styles.rightSection}>
					<div style={styles.logoWrapper}>
						<Image
							style={styles.logo}
							resizeMode={"contain"}
							source={logoUrl}
						/>
					</div>
					<div style={styles.timeWrapper}>
						<div style={styles.time}>{`${startTime} - ${endTime}. ${day}`}</div>
						<ProgressBar percent={timePercentElapsedBetween(program.start, program.end)} />
					</div>
					<div style={styles.buttons}>
						<div style={styles.button}>
							<Link
								to={{
									pathname: "/tv",
									state: {from: "details"},
									query: {channelId: program.channelInfo && program.channelInfo.channelId}
								}}
							>{
								({transition}) => <div onClick={transition}>
									<div style={styles.buttonTextWrapper}>
										<div style={styles.buttonText}>{"WATCH"}</div>
										<Icon
											style={styles.buttonIcon}
											name={"play-arrow"}
										/>
									</div>
								</div>
							}</Link>
						</div>
					</div>
					<div style={styles.devicesLabel}>
						<div style={styles.title}>{"Devices"}</div>
					</div>
					<div style={styles.devices}>
						{program.channelInfo && program.channelInfo.terminals ?
							program.channelInfo.terminals.map((terminal, index) => <Icon
								key={index}
								style={styles.device}
								name={iconKeys[terminal] || "computer"}
							/>) : null}
					</div>
				</div>
			</div>
		</div>
		<BottomBarContainer component={BottomBar} />
	</div>);
};

DetailsProgram.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.shape({
			from: PropTypes.string.isRequired
		})
	}).isRequired,
	program: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		images: PropTypes.shape({
			CarouselLandscapeHeader: PropTypes.string
		}),
		channelInfo: PropTypes.shape({
			images: PropTypes.shape({
				LOGO: PropTypes.string
			}),
			terminals: PropTypes.arrayOf(PropTypes.string)
		}),
		start: PropTypes.number,
		end: PropTypes.number
	}).isRequired
};

export default DetailsProgram;
