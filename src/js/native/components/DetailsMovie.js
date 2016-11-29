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
	const movie = props.movie;
	const imageUrl = (movie.images && movie.images.CarouselLandscapeHeader) || "";

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
						<Text style={styles.title}>{movie.title || ""}</Text>
					</View>
					<View>
						<Text style={styles.description}>{movie.description || ""}</Text>
					</View>
				</View>
				<View style={styles.rightSection}>
					<View style={styles.buttons}>
						<View style={styles.button}>
							<Link
								to={{
									pathname: "/tv",
									state: {from: "details"},
									query: {channelId: null}
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
						{movie.structuredTags && movie.structuredTags.terminals ?
							movie.structuredTags.terminals.map((terminal, index) => <Text
								key={index}
								style={styles.device}
							>
								{terminal.title || ""}
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
	movie: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		images: PropTypes.shape({
			CarouselLandscapeHeader: PropTypes.string
		}),
		structuredTags: PropTypes.shape({
			terminals: PropTypes.arrayOf(PropTypes.shape({
				title: PropTypes.string
			}))
		})
	}).isRequired
};

export default DetailsProgram;
