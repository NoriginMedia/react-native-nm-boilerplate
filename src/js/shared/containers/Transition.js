import React, {PropTypes} from "react";
import {Motion, spring} from "react-motion";

const slowSpringConfig = {
	stiffness: 280,
	damping: 28,
	precision: 0.1
};

const fastSpringConfig = {
	...slowSpringConfig,
	stiffness: 300
};

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
		const {component: Component, matched, animated, ...rest} = this.props;

		const firstTimeRender = !this.state.fadingIn && !this.state.fadingOut;
		const matchedFromBeginning = matched && firstTimeRender;

		const startFader = matchedFromBeginning || this.state.fadingOut ? 100 : 0;
		const endFader = matchedFromBeginning || this.state.fadingIn ? 100 : 0;

		const springConfig = this.state.fadingOut ? fastSpringConfig : slowSpringConfig;

		return (<Motion
			defaultStyle={{fader: startFader}}
			style={{fader: animated ? spring(endFader, springConfig) : endFader}}
		>
			{({fader}) => {
				if (fader === 0) {
					return null;
				}

				const fadingIn = this.state.fadingIn && fader !== 100;
				const fadingOut = this.state.fadingOut;

				return (<Component
					fader={fader}
					fadingIn={fadingIn}
					fadingOut={fadingOut}
					isAnimating={fadingIn || fadingOut}
					{...rest}
				/>);
			}}
		</Motion>);
	}
}

Transition.propTypes = {
	component: PropTypes.func.isRequired,
	matched: PropTypes.bool.isRequired,
	animated: PropTypes.bool
};

const createTransition = (Component, animated) => (props) => <Transition
	component={Component}
	animated={animated}
	{...props}
/>;

export default createTransition;
