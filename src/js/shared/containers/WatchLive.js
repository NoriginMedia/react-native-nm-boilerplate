import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {fetchChannelStream} from "../actions";

class WatchLive extends React.Component {
	constructor(props) {
		super(props);

		this.onChannelSelect = this.onChannelSelect.bind(this);
	}

	componentDidMount() {
		let {channelId} = this.props.location.query;

		if (!channelId) {
			channelId = this.props.channels.length ? this.props.channels[0].id : null;
		}

		if (channelId) {
			this.props.fetchChannelStream(channelId);
		}
	}

	onChannelSelect(channelId) {
		if (channelId) {
			this.props.fetchChannelStream(channelId);
		}
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component
				onChannelSelect={this.onChannelSelect}
				{...rest}
			/>
		);
	}
}

WatchLive.propTypes = {
	component: PropTypes.func.isRequired,
	channelStreamUrl: PropTypes.string,
	fetchChannelStream: PropTypes.func.isRequired,
	location: PropTypes.shape({
		query: PropTypes.shape({
			channelId: PropTypes.string
		})
	}).isRequired,
	channels: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string
	}))
};

const mapStateToProps = ({channelStreamUrl, channels}) => ({
	channelStreamUrl,
	channels
});

export default connect(mapStateToProps, {
	fetchChannelStream
})(WatchLive);
