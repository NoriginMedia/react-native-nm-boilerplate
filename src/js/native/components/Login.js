import React, {PropTypes} from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import {Redirect} from "react-router";
import TopBar from "./TopBar";
import {screenHeight} from "../utils/screen";
import {absoluteFlex} from "../../shared/styles/layout";
import {floatFromTop} from "../styles/animations";

const styles = {
	content: {
		flex: 1
	},
	textInput: {
		height: 40
	}
};

const getFadingStyle = ({fader, fadingIn, fadingOut}) => {
	let fadingStyle = {
		flex: 1
	};

	if (fadingIn) {
		fadingStyle = {
			zIndex: 2,
			...absoluteFlex,
			...floatFromTop(fader, screenHeight)
		};
	} else if (fadingOut) {
		fadingStyle = {
			zIndex: 1,
			...absoluteFlex
		};
	}

	return fadingStyle;
};

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			forceRedirectHome: false
		};

		this.redirectToReferrer = this.redirectToReferrer.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onSubmit() {
		this.props.login(this.state);
	}

	onCancel() {
		this.setState({forceRedirectHome: true});
	}

	redirectToReferrer() {
		const referrer = this.props.location.state && this.props.location.state.referrer;

		return (<Redirect
			to={{
				pathname: referrer ? referrer.pathname : "/",
				query: referrer ? referrer.query || {} : {},
				state: {
					from: "login"
				}
			}}
		/>);
	}

	renderContent() {
		if (this.props.fullyAuthenticated) {
			return this.redirectToReferrer();
		} else if (this.state.forceRedirectHome) {
			return (<Redirect to={{pathname: "/"}} />);
		}

		return (<View accessibilityLabel={"LOGIN"} >
			<View>
				<TextInput
					style={styles.textInput}
					onChangeText={(username) => this.setState({username})}
					value={this.state.username}
				/>
			</View>
			<View>
				<TextInput
					style={styles.textInput}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
				/>
			</View>
			<TouchableOpacity onPress={this.onSubmit}>
				<View>
					<Text>{"Submit"}</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.onCancel}>
				<View>
					<Text>{"Cancel"}</Text>
				</View>
			</TouchableOpacity>
		</View>);
	}

	render() {
		return (<View
			style={{
				...getFadingStyle(this.props)
			}}
		>
			<TopBar />
			{this.renderContent()}
		</View>);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	fullyAuthenticated: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		state: PropTypes.shape({
			referrer: PropTypes.shape({
				pathname: PropTypes.string.isRequired,
				query: PropTypes.object
			})
		})
	}).isRequired,
	fader: PropTypes.number.isRequired,
	fadingIn: PropTypes.bool.isRequired,
	fadingOut: PropTypes.bool.isRequired
};

export default Login;
