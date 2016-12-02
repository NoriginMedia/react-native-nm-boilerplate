import React, {PropTypes} from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";

// import {floatFromRight} from "../styles/animations";

import Image from "./Image";
import {timePercentElapsedBetween, timestampToTimeString, timestampToDayString} from "../../shared/utils/time";
import colors from "../../shared/styles/colors";
import ProgressBar from "./ProgressBar";
import iconKeys from "../../shared/styles/iconKeys";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.background
	},
	scrollContent: {
		flexDirection: "row"
	},
	leftSection: {
		flex: 3
	},
	imageWrapper: {
		padding: 10
	},
	image: {
		height: 150,
		width: 200
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
		flexDirection: "row",
		justifyContent: "space-around",
		paddingLeft: 10,
		paddingTop: 3,
		paddingBottom: 3,
		paddingRight: 5
	},
	buttonTextWrapper: {
		flexDirection: "row",
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
		flexDirection: "row",
		flexWrap: "wrap"
	},
	device: {
		padding: 1,
		color: "white",
		fontSize: 20
	}
});

const DetailsProgram = (props) => {
	const program = props.program;
	const imageUrl = (program.images && program.images.CarouselLandscapeHeader) || "";
	const logoUrl = (program.channelInfo &&
		program.channelInfo.images &&
		program.channelInfo.images.LOGO) || "";
	const startTime = timestampToTimeString(program.start);
	const endTime = timestampToTimeString(program.end);
	const day = timestampToDayString(program.start);

	return (<View style={{flex: 1}}>
		<TopBar
			leftButtonPath={props.location.state.from}
			leftButtonReferer={"details"}
		/>
		<View style={styles.content}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.leftSection}>
					<View style={styles.imageWrapper}>
						<Image
							style={styles.image}
							resizeMode={"contain"}
							source={imageUrl}
						/>
					</View>
					<View>
						<Text
							ellipsizeMode={"tail"}
							numberOfLines={1}
							style={styles.title}
						>
							{program.title || ""}
						</Text>
					</View>
					<View>
						<Text
							ellipsizeMode={"tail"}
							style={styles.description}
						>
							{program.description || ""}
						</Text>
					</View>
				</View>
				<View style={styles.rightSection}>
					<View style={styles.logoWrapper}>
						<Image
							style={styles.logo}
							resizeMode={"contain"}
							source={logoUrl}
						/>
					</View>
					<View style={styles.timeWrapper}>
						<Text style={styles.time}>{`${startTime} - ${endTime}. ${day}`}</Text>
						<ProgressBar percent={timePercentElapsedBetween(program.start, program.end)} />
					</View>
					<View style={styles.buttons}>
						<View style={styles.button}>
							<Link
								to={{
									pathname: "/tv",
									state: {from: "details"},
									query: {channelId: program.channelInfo && program.channelInfo.channelId}
								}}
							>{
								({transition}) => <TouchableOpacity
									onPress={transition}
								>
									<View style={styles.buttonTextWrapper}>
										<Text style={styles.buttonText}>{"WATCH"}</Text>
										<Icon
											style={styles.buttonIcon}
											name={"play-arrow"}
										/>
									</View>
								</TouchableOpacity>
							}</Link>
						</View>
					</View>
					<View style={styles.devicesLabel}>
						<Text style={styles.title}>{"Devices"}</Text>
					</View>
					<View style={styles.devices}>
						{program.channelInfo && program.channelInfo.terminals ?
							program.channelInfo.terminals.map((terminal, index) => <Icon
								key={index}
								style={styles.device}
								name={iconKeys[terminal] || "computer"}
							/>) : null}
					</View>
				</View>
			</ScrollView>
		</View>
		<BottomBarContainer component={BottomBar} />
	</View>);
};

DetailsProgram.propTypes = {
	location: PropTypes.shape({
		state: PropTypes.shape({
			from: PropTypes.string.isRequired
		}).isRequired
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
