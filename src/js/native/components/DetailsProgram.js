import React, {PropTypes} from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import {floatFromRight} from "../styles/animations";
import Image from "./Image";
import {timePercentElapsedBetween, timestampToTimeString, timestampToDayString} from "../../shared/utils/time";
import colors from "../../shared/styles/colors";

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

	},
	image: {
		height: 200
	},
	title: {
		color: "white"
	},
	description: {
		color: "white"
	},
	rightSection: {
		flex: 2
	},
	logoWrapper: {

	},
	logo: {
		height: 60
	},
	time: {
		color: "white"
	},
	buttons: {
		alignItems: "center"
	},
	button: {
		backgroundColor: colors.accent
	},
	buttonText: {
		color: "white"
	},
	devices: {

	},
	device: {
		color: "white"
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

	return (<View
		style={
			props.isAnimating ?
				floatFromRight(props.fader, true) :
			{flex: 1}
		}
	>
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
						<Text style={styles.title}>{program.title || ""}</Text>
					</View>
					<View>
						<Text style={styles.description}>{program.description || ""}</Text>
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
					<View>
						<Text style={styles.time}>{`${startTime} - ${endTime}. ${day}`}</Text>
						<Text style={styles.time}>{timePercentElapsedBetween(program.start, program.end)}</Text>
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
									<Text style={styles.buttonText}>{"Watch now"}</Text>
								</TouchableOpacity>
							}</Link>
						</View>
					</View>
					<View style={styles.devices}>
						{program.channelInfo && program.channelInfo.terminals ?
							program.channelInfo.terminals.map((terminal, index) => <Text
								key={index}
								style={styles.device}
							>
								{terminal}
							</Text>) : null}
					</View>
				</View>
			</ScrollView>
		</View>
		<BottomBarContainer component={BottomBar} />
	</View>);
};

DetailsProgram.propTypes = {
	fader: PropTypes.number.isRequired,
	isAnimating: PropTypes.bool.isRequired,
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
