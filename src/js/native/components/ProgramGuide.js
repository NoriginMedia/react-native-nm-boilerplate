import React, {PropTypes} from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {isArray, each} from "lodash";
import moment from "moment";
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

const PIXELS_PER_HOUR = 300;
const TIMELINE_DISPLAY_OFFSET = 30;

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	timelineWrapper: {
		height: 30,
		flexDirection: "row"
	},
	timelineMarker: {
		position: "absolute",
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "red",
		width: 1
	},
	epgVerticalScroll: {
		flex: 1
	},
	epgContainer: {
		flex: 1,
		flexDirection: "row"
	},
	logos: {
		width: 60,
		paddingTop: 30
	},
	nowButton: {
		position: "absolute",
		width: 60,
		height: 30,
		left: 0,
		top: 0,
		backgroundColor: "white"
	},
	logo: {
		height: 60,
		backgroundColor: "black"
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
	program: {
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "black",
		overflow: "hidden",
		maxHeight: 60
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
				<Text>{timestampToTimeString(intervalStart)}</Text>
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

				return (<Image
					key={index}
					style={styles.logo}
					resizeMode={"cover"}
					source={imageUrl}
				/>);
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
				{isArray(channel.schedules) ? channel.schedules.map((program, programIndex) => <View
					key={programIndex}
					style={[styles.program, {
						width: timeIntervalWidthPerHour(program.start, program.end, PIXELS_PER_HOUR),
						marginLeft: (programIndex === 0 && program.start > minTime) ?
							timeIntervalWidthPerHour(minTime, program.start, PIXELS_PER_HOUR) : 0
					}]}
				>
					<Text>{program.title}</Text>
					<Text>{`${timestampToTimeString(program.start)} - ${timestampToTimeString(program.end)}`}</Text>
				</View>) : null}
			</View>)}
		</View>);
	}

	render() {
		const {minTime, maxTime} = this.state;

		return (<View style={styles.content}>
			<TopBar />
			<View style={styles.content}>
				<ScrollView style={styles.epgVerticalScroll}>
					<View style={styles.epgContainer}>
						{this.renderLogos()}
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
					</View>
				</ScrollView>
				<View style={styles.nowButton}>
					<TouchableOpacity onPress={this.scrollToNow}>
						<Text>{"NOW"}</Text>
					</TouchableOpacity>
				</View>
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
				start: PropTypes.number.isRequired,
				end: PropTypes.number.isRequired
			})
		)
	}))
};

export default ProgramGuide;
