import React, {PropTypes} from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import {isArray, each} from "lodash";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import Image from "./Image";
import {
	timestampToTimeString,
	hourIntervalsBetween,
	timeAfterHours,
	timeIntervalWidthPerHour,
	getCurrentTimestamp
} from "../../shared/utils/time";
import colors from "../../shared/styles/colors";

// import {staticBackground} from "../styles/animations";

const PIXELS_PER_HOUR = 300;
const TIMELINE_DISPLAY_OFFSET = 120;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.background
	},
	timelineWrapper: {
		height: 30,
		flexDirection: "row",
		backgroundColor: colors.secondary
	},
	timelineMarker: {
		position: "absolute",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.accent,
		width: 1
	},
	timeIntervalText: {
		color: colors.accent
	},
	epgVerticalScroll: {
		flex: 1
	},
	epgContainer: {
		flex: 1,
		flexDirection: "row"
	},
	logos: {
		position: "absolute",
		left: 0,
		top: 0,
		width: 60,
		paddingTop: 30,
		backgroundColor: colors.background,
		opacity: 0.9
	},
	nowButton: {
		position: "absolute",
		borderRadius: 20,
		width: 40,
		height: 40,
		right: 10,
		bottom: 10,
		backgroundColor: colors.accent,
		alignItems: "center",
		justifyContent: "center"
	},
	nowButtonIcon: {
		fontSize: 22,
		color: "white"
	},
	logoWrapper: {
		height: 60,
		padding: 5
	},
	logo: {
		height: 50,
		width: 50
	},
	epgHorizontalScrollWrapper: {
		flex: 1
	},
	epgHorizontalScroll: {
		flex: 1
	},
	channelsList: {
		flex: 1
	},
	channelRow: {
		flexDirection: "row",
		height: 60
	},
	programWrapper: {
		padding: 1,
		height: 60
	},
	program: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.primary,
		backgroundColor: colors.secondary,
		padding: 5,
		height: 58
	},
	programTitle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 12
	},
	programTime: {
		color: "white",
		fontSize: 10,
		paddingBottom: 5
	}
});

class ProgramGuide extends React.Component {
	static getCurrentScrollPosition(minTime, negativeOffset) {
		return timeIntervalWidthPerHour(minTime, getCurrentTimestamp(), PIXELS_PER_HOUR) - negativeOffset;
	}

	static getTimeLimits(props) {
		let minTime = null;
		let maxTime = null;

		each(props.channels, (channel) => {
			if (isArray(channel.schedules)) {
				each(channel.schedules, (schedule) => {
					if (!minTime || schedule.start < minTime) {
						minTime = schedule.start;
					}
					if (!maxTime || schedule.end > maxTime) {
						maxTime = schedule.end;
					}
				});
			}
		});

		const minutes = moment(minTime).minutes();

		if (minutes > 0) {
			// align down to the nearest hour:00
			minTime = moment(minTime).subtract(minutes, "minutes").valueOf();
		}

		return {
			minTime,
			maxTime
		};
	}

	static renderTimeline(minTime, maxTime) {
		const intervalsCount = hourIntervalsBetween(minTime, maxTime);
		const intervals = [];

		for (let i = 0; i < intervalsCount; i++) {
			const intervalStart = timeAfterHours(minTime, i);
			const width = (timeAfterHours(intervalStart, 1) <= maxTime) ?
				PIXELS_PER_HOUR :
				timeIntervalWidthPerHour(intervalStart, maxTime, PIXELS_PER_HOUR);

			intervals.push(<View
				key={i}
				style={{width}}
			>
				<Text style={styles.timeIntervalText}>{timestampToTimeString(intervalStart)}</Text>
			</View>);
		}

		return (<View style={styles.timelineWrapper}>
			{intervals}
		</View>);
	}

	constructor(props) {
		super(props);

		this.state = {
			minTime: 0,
			maxTime: 0,
			scrollPosition: 0,
			timelinePosition: 0
		};

		this.scrollToNow = this.scrollToNow.bind(this);

		this.updateTime = this.updateTime.bind(this);
		this.timer = setInterval(this.updateTime, 3000);
	}

	componentWillReceiveProps(newProps) {
		const {minTime, maxTime} = ProgramGuide.getTimeLimits(newProps);
		const scrollPosition = ProgramGuide.getCurrentScrollPosition(minTime, TIMELINE_DISPLAY_OFFSET);
		const timelinePosition = ProgramGuide.getCurrentScrollPosition(minTime, 0);

		this.setState({
			minTime,
			maxTime,
			scrollPosition,
			timelinePosition
		});
	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	updateTime() {
		const timelinePosition = ProgramGuide.getCurrentScrollPosition(this.state.minTime, 0);

		this.setState({
			timelinePosition
		});
	}

	scrollToNow() {
		this.setState({
			scrollPosition: ProgramGuide.getCurrentScrollPosition(this.state.minTime, TIMELINE_DISPLAY_OFFSET)
		});
	}

	renderLogos() {
		return (<View style={styles.logos}>
			{this.props.channels.map((channel, index) => {
				const imageUrl = channel.images.LOGO;

				return (<View
					key={index}
					style={styles.logoWrapper}
				>
					<Image
						style={styles.logo}
						resizeMode={"contain"}
						source={imageUrl}
					/>
				</View>);
			})}
		</View>);
	}

	renderChannelList(minTime, maxTime) {
		return (<View style={styles.channelsList}>
			{ProgramGuide.renderTimeline(minTime, maxTime)}
			{this.props.channels.map((channel, index) => <View
				key={index}
				style={styles.channelRow}
			>
				{isArray(channel.schedules) ? channel.schedules.map((program, programIndex) => <Link
					key={programIndex}
					to={{
						pathname: "/details/program",
						state: {from: "/guide"},
						query: {
							channelId: channel.id,
							programId: program.id
						}
					}}
				>{
					({transition}) => <TouchableOpacity
						onPress={transition}
					>
						<View
							style={[styles.programWrapper, {
								width: timeIntervalWidthPerHour(program.start, program.end, PIXELS_PER_HOUR),
								marginLeft: (programIndex === 0 && program.start > minTime) ?
									timeIntervalWidthPerHour(minTime, program.start, PIXELS_PER_HOUR) : 0
							}]}
						>
							<View style={styles.program}>
								<Text
									ellipsizeMode={"tail"}
									numberOfLines={1}
									style={styles.programTitle}
								>
									{program.title}
								</Text>
								<Text
									ellipsizeMode={"tail"}
									numberOfLines={1}
									style={styles.programTime}
								>
									{`${timestampToTimeString(program.start)} - ${timestampToTimeString(program.end)}`}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				}</Link>) : null}
			</View>)}
		</View>);
	}

	render() {
		const {minTime, maxTime} = this.state;

		return (<View style={{flex: 1}}>
			<TopBar />
			<View style={styles.content}>
				<ScrollView style={styles.epgVerticalScroll}>
					<View style={styles.epgContainer}>
						<View style={styles.epgHorizontalScrollWrapper}>
							<ScrollView
								horizontal
								style={styles.epgHorizontalScroll}
								contentOffset={{
									x: this.state.scrollPosition,
									y: 0
								}}
							>
								{this.renderChannelList(minTime, maxTime)}
								<View
									style={[styles.timelineMarker, {
										height: (this.props.channels.length * 60) + 30,
										left: this.state.timelinePosition
									}]}
								/>
							</ScrollView>
						</View>
						{this.renderLogos()}
					</View>
				</ScrollView>
				<TouchableOpacity onPress={this.scrollToNow}>
					<View style={styles.nowButton}>
						<Icon style={styles.nowButtonIcon} name={"replay"} />
					</View>
				</TouchableOpacity>
			</View>
			<BottomBarContainer component={BottomBar} />
		</View>);
	}
}

ProgramGuide.propTypes = {
	channels: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		images: PropTypes.shape({
			LOGO: PropTypes.string
		}).isRequired,
		id: PropTypes.string.isRequired,
		schedules: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				id: PropTypes.string.isRequired,
				start: PropTypes.number.isRequired,
				end: PropTypes.number.isRequired
			})
		)
	}))
};

export default ProgramGuide;
