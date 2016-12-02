import React, {PropTypes} from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import {Redirect} from "react-router";
import TopBar from "./TopBar";

// import {floatFromTop} from "../styles/animations";

import colors from "../../shared/styles/colors";

const styles = {
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background
	},
	inputWrapper: {
		padding: 10
	},
	textInput: {
		paddingLeft: 5,
		height: 40,
		width: 200,
		backgroundColor: "white"
	},
	inputLabel: {
		padding: 5,
		color: "white",
		fontWeight: "bold"
	},
	buttons: {
		alignItems: "center"
	},
	button: {
		marginTop: 10,
		backgroundColor: colors.accent,
		justifyContent: "space-around",
		alignItems: "center",
		paddingLeft: 5,
		paddingTop: 3,
		paddingBottom: 3,
		paddingRight: 5,
		height: 40,
		width: 100
	},
	buttonTextWrapper: {
		justifyContent: "space-around",
		alignItems: "center"
	},
	buttonText: {
		color: "white"
	}
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

		return (<View style={styles.content}>
			<View style={styles.inputWrapper}>
				<Text style={styles.inputLabel}>{"Username"}</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(username) => this.setState({username})}
					value={this.state.username}
				/>
			</View>
			<View style={styles.inputWrapper}>
				<Text style={styles.inputLabel}>{"Password"}</Text>
				<TextInput
					secureTextEntry
					style={styles.textInput}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
				/>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity onPress={this.onSubmit}>
					<View style={styles.button}>
						<View style={styles.buttonTextWrapper}>
							<Text style={styles.buttonText}>{"Sign In"}</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onCancel}>
					<View style={styles.button}>
						<View style={styles.buttonTextWrapper}>
							<Text style={styles.buttonText}>{"Cancel"}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>);
	}

	render() {
		return (<View style={{flex: 1}}>
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
	}).isRequired
};

export default Login;
