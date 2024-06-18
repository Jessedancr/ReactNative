import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Image,
} from "react-native";
import { useState } from "react";

// FIREBASE IMPORTS
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Firebase/Firebase_Config";

// RN PAPER IMPORT
import { MD2DarkTheme as DefaultTheme, useTheme } from "react-native-paper";

export default function HomeScreen({ navigation }) {
	// DEFINING STATE VARIABLES
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// DEFINING STYLING FOR VARIOUS COMPONENTS USING REACT NATIVE PAPER
	const theme = useTheme();
	const formView = {
		backgroundColor: theme.colors.surface,
		height: "50%",
		width: "70%",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		margin: 70,
	};
	const textInputStyle = {
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginVertical: 10,
		backgroundColor: theme.colors.surface,
		borderRadius: 10,
		borderColor: "black",
		borderWidth: 1.5,
		width: "85%",
	};
	const buttonStyle = {
		height: 50,
		width: 150,
		backgroundColor: theme.colors.onSurface,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
	};

	// FUNCTION TO NAVIGATE USER BACK TO LOG IN PAGE
	const userLogIn = () => {
		console.log("User login page");
		navigation.replace("LoginScreen");
	};

	// FUNCTIONN TO SIGN USER UP
	const userSignUp = async () => {
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const newUser = userCred.user;
			console.log(`Signed up with ${newUser.email}`);
			navigation.replace("HomeScreen");
		} catch (error) {
			alert(error.message);
		}
	};

	// JSX TEMPLATE TO RETURN THE UI
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/SignUp_BG3.jpg")}
				style={styles.backgroundImage}>
				<Image
					source={require("../assets/icon_img.jpg")}
					style={styles.imageStyle}
				/>
				<View style={formView}>
					<TextInput
						style={textInputStyle}
						placeholder="Email"
						value={email}
						onChangeText={(email) => {
							setEmail(email);
						}}
					/>

					<TextInput
						style={textInputStyle}
						placeholder="Password"
						value={password}
						onChangeText={(password) => {
							setPassword(password);
						}}
						secureTextEntry
					/>
					<TouchableOpacity style={buttonStyle} onPress={userSignUp}>
						<Text style={{ color: "white" }}>S I G N U P</Text>
					</TouchableOpacity>
					<View style={{ marginTop: 60 }}>
						<Text
							style={{ fontWeight: "bold", fontSize: 14 }}
							onPress={userLogIn}>
							Already have an account? Log in
						</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	imageStyle: {
		height: "10%",
		width: "20%",
		padding: 50,
		marginTop: 50,
		borderRadius: 50,
	},
});
