import React, {PropTypes} from "react";
import {Link} from "react-router";
import {isArray, each} from "lodash";
import moment from "moment";
import Icon from "./Icon";
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
import {verticalFlex, horizontalFlex} from "../styles/layout";

const PIXELS_PER_HOUR = 300;
const TIMELINE_DISPLAY_OFFSET = 120;

const styles = {
	content: {
		...verticalFlex,
		flex: 1,
		backgroundColor: colors.background,
		position: "relative"
	},
	timelineWrapper: {
		height: 30,
		...horizontalFlex,
		backgroundColor: colors.secondary,
		position: "relative"
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
		...verticalFlex,
		flex: 1,
		overflowY: "scroll"
	},
	epgContainer: {
		flex: 1,
		...horizontalFlex,
		position: "relative"
	},
	logos: {
		position: "absolute",
		left: 0,
		top: 0,
		width: 120,
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
		...verticalFlex,
		alignItems: "center",
		justifyContent: "center"
	},
	nowButtonIcon: {
		fontSize: 22,
		color: "white"
	},
	logoWrapper: {
		height: 120,
		padding: 5
	},
	logo: {
		height: 100,
		width: 100
	},
	epgHorizontalScroll: {
		...verticalFlex,
		overflowX: "scroll",
		flex: 1
	},
	channelsList: {
		...verticalFlex,
		flex: 1
	},
	channelRow: {
		...horizontalFlex,
		height: 120
	},
	programWrapper: {
		padding: 1,
		height: 120
	},
	program: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: colors.primary,
		backgroundColor: colors.secondary,
		padding: 5,
		height: 110
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
};

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

			intervals.push(
				<div
					key={i}
					style={{
						...styles.timeIntervalText,
						minWidth: width
					}}
				>
					{timestampToTimeString(intervalStart)}
				</div>
			);
		}

		return (<div style={styles.timelineWrapper}>
			{intervals}
		</div>);
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
		return (<div style={styles.logos}>
			{this.props.channels.map((channel, index) => {
				const imageUrl = channel.images.LOGO;

				return (<div
					key={index}
					style={styles.logoWrapper}
				>
					<Image
						style={styles.logo}
						resizeMode={"contain"}
						source={imageUrl}
					/>
				</div>);
			})}
		</div>);
	}

	renderChannelList(minTime, maxTime) {
		return (<div style={styles.channelsList}>
			{ProgramGuide.renderTimeline(minTime, maxTime)}
			{this.props.channels.map((channel, index) => <div
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
					({transition}) => <div onClick={transition}>
						<div
							style={{
								...styles.programWrapper,
								minWidth: timeIntervalWidthPerHour(program.start, program.end, PIXELS_PER_HOUR),
								marginLeft: (programIndex === 0 && program.start > minTime) ?
									timeIntervalWidthPerHour(minTime, program.start, PIXELS_PER_HOUR) : 0
							}}
						>
							<div style={styles.program}>
								<div style={styles.programTitle}>
									{program.title}
								</div>
								<div style={styles.programTime}>
									{`${timestampToTimeString(program.start)} - ${timestampToTimeString(program.end)}`}
								</div>
							</div>
						</div>
					</div>
				}</Link>) : null}
			</div>)}
		</div>);
	}

	render() {
		const {minTime, maxTime} = this.state;

		return (<div style={styles.content}>
			<TopBar />
			<div style={styles.content}>
				<div style={styles.epgVerticalScroll}>
					<div style={styles.epgContainer}>
						<div style={styles.epgHorizontalScroll}>
							{this.renderChannelList(minTime, maxTime)}
							<div
								style={{
									...styles.timelineMarker,
									height: (this.props.channels.length * 120) + 30,
									left: this.state.timelinePosition
								}}
							/>
						</div>
						{this.renderLogos()}
					</div>
				</div>
				<div onClick={this.scrollToNow}>
					<div style={styles.nowButton}>
						<Icon style={styles.nowButtonIcon} name={"replay"} />
					</div>
				</div>
			</div>
			<BottomBarContainer component={BottomBar} />
		</div>);
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
