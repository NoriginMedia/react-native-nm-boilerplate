import React, {PropTypes} from "react";
import {Link} from "react-router";
import Icon from "./Icon";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import Image from "./Image";
import colors from "../../shared/styles/colors";
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
		flex: 1,
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
	const movie = props.movie;
	const imageUrl = (movie.images && movie.images.CarouselLandscapeHeader) || "";

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
							{movie.title || ""}
						</div>
					</div>
					<div>
						<div style={styles.description}>
							{movie.description || ""}
						</div>
					</div>
				</div>
				<div style={styles.rightSection}>
					<div style={styles.buttons}>
						<div style={styles.button}>
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
						{movie.structuredTags && movie.structuredTags.terminals ?
							movie.structuredTags.terminals.map((terminal, index) => <Icon
								key={index}
								style={styles.device}
								name={iconKeys[terminal.title] || "computer"}
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
