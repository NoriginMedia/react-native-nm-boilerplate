import React, {PropTypes} from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import {floatFromRight} from "../styles/animations";
import Image from "./Image";
import colors from "../../shared/styles/colors";
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
		flex: 1,
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
						<Text
							ellipsizeMode={"tail"}
							numberOfLines={1}
							style={styles.title}
						>
							{movie.title || ""}
						</Text>
					</View>
					<View>
						<Text
							ellipsizeMode={"tail"}
							style={styles.description}
						>
							{movie.description || ""}
						</Text>
					</View>
				</View>
				<View style={styles.rightSection}>
					<View style={styles.buttons}>
						<View style={styles.button}>
							<Link
								to={{
									pathname: "/movies",
									state: {from: "details"},
									query: {
										movieId: movie.id,
										movieType: movie.type
									}
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
						{movie.structuredTags && movie.structuredTags.terminals ?
							movie.structuredTags.terminals.map((terminal, index) => <Icon
								key={index}
								style={styles.device}
								name={iconKeys[terminal.title] || "computer"}
							/>) : null}
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
		id: PropTypes.string,
		type: PropTypes.string,
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
