import React, {PropTypes} from "react";
import {Motion, spring} from "react-motion";

class Transition extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fadingIn: false,
			fadingOut: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.matched && !this.props.matched) {
			this.setState({
				fadingIn: true,
				fadingOut: false
			});
		} else if (!nextProps.matched && this.props.matched) {
			this.setState({
				fadingIn: false,
				fadingOut: true
			});
		}
	}

	render() {
		const {component: Component, matched, ...rest} = this.props;

		const firstTimeRender = !this.state.fadingIn && !this.state.fadingOut;
		const matchedFromBeginning = matched && firstTimeRender;

		return (<Motion
			defaultStyle={{fader: matchedFromBeginning || this.state.fadingOut ? 100 : 0}}
			style={{fader: spring(matchedFromBeginning || this.state.fadingIn ? 100 : 0)}}
		>
			{({fader}) => {
				if (fader === 0) {
					return null;
				}

				return (<Component
					fader={fader}
					fadingIn={this.state.fadingIn}
					fadingOut={this.state.fadingOut}
					{...rest}
				/>);
			}}
		</Motion>);
	}
}

Transition.propTypes = {
	component: PropTypes.func.isRequired,
	matched: PropTypes.bool.isRequired
};

const createTransition = (Component) => (props) => <Transition component={Component} {...props} />;

export default createTransition;
