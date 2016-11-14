import React, {PropTypes} from "react";
import {View, TextInput, TouchableOpacity, Text} from "react-native";
import {Redirect} from "react-router";
import TopBar from "./TopBar";

const styles = {
	content: {
		flex: 1
	},
	textInput: {
		height: 40
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

		this.redirectToReferer = this.redirectToReferer.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onSubmit() {
		this.props.login(this.state);
	}

	onCancel() {
		this.setState({forceRedirectHome: true});
	}

	redirectToReferer() {
		const referer = this.props.location.state && this.props.location.state.referer;

		return (<Redirect
			to={{
				pathname: referer ? referer.pathname : "/",
				query: referer ? referer.query || {} : {},
				state: {
					from: "login"
				}
			}}
		/>);
	}

	render() {
		if (this.props.fullyAuthenticated) {
			return this.redirectToReferer();
		} else if (this.state.forceRedirectHome) {
			return (<Redirect to={{pathname: "/"}} />);
		}

		return (<View style={styles.content}>
			<TopBar />
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
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	fullyAuthenticated: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		state: PropTypes.shape({
			referer: PropTypes.shape({
				pathname: PropTypes.string.isRequired,
				query: PropTypes.object
			})
		})
	}).isRequired
};

export default Login;
