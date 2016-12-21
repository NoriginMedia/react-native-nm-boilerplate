import React, {PropTypes} from "react";
import {Redirect} from "react-router";
import TopBar from "./TopBar";
import colors from "../../shared/styles/colors";
import {verticalFlex} from "../styles/layout";

const styles = {
	content: {
		...verticalFlex,
		flex: 1
	},
	form: {
		...verticalFlex,
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
		...verticalFlex,
		alignItems: "center"
	},
	button: {
		...verticalFlex,
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
		...verticalFlex,
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

		return (<div style={styles.form}>
			<div style={styles.inputWrapper}>
				<div style={styles.inputLabel}>{"Username"}</div>
				<input
					type={"text"}
					style={styles.textInput}
					onChange={(e) => this.setState({username: e.target.value})}
					value={this.state.username}
				/>
			</div>
			<div style={styles.inputWrapper}>
				<div style={styles.inputLabel}>{"Password"}</div>
				<input
					type={"password"}
					style={styles.textInput}
					onChange={(e) => this.setState({password: e.target.value})}
					value={this.state.password}
				/>
			</div>
			<div style={styles.buttons}>
				<div onClick={this.onSubmit}>
					<div style={styles.button}>
						<div style={styles.buttonTextWrapper}>
							<div style={styles.buttonText}>{"Sign In"}</div>
						</div>
					</div>
				</div>
				<div onClick={this.onCancel}>
					<div style={styles.button}>
						<div style={styles.buttonTextWrapper}>
							<div style={styles.buttonText}>{"Cancel"}</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
	}

	render() {
		return (<div style={styles.content}>
			<TopBar />
			{this.renderContent()}
		</div>);
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
