import React, {PropTypes} from "react";
import {Motion} from "react-motion";

const FadingIn = ({component: Component, ...rest}) => <Motion style={{}}>
	{() => <Component {...rest} />}
</Motion>;

FadingIn.propTypes = {
	component: PropTypes.func.isRequired
};

const FadingOut = ({component: Component, ...rest}) => <Motion style={{}}>
	{() => <Component {...rest} />}
</Motion>;

FadingOut.propTypes = {
	component: PropTypes.func.isRequired
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
		const {component: Component, matched, ...rest} = this.props;

		if (this.state.fadingIn) {
			return <FadingIn component={Component} {...rest} />;
		} else if (this.state.fadingOut) {
			return <FadingOut component={Component} {...rest} />;
		}

		return (matched ? <Component {...rest} /> : null);
	}
}

Transition.propTypes = {
	component: PropTypes.func.isRequired,
	matched: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

const createTransition = (Component) => (props) => <Transition component={Component} {...props} />;

export default createTransition;
