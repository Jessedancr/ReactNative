import { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

// FIREBASE IMPORTS
import { auth } from "./Firebase/Firebase_Config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// REACT NATIVE PAPER IMPORT
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
	// DEFINING STATE VARIABLES
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

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
		marginTop: 25,
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

	// FUNCTION TO LOG USER IN
	const userLogin = async () => {
		try {
			const userCred = await signInWithEmailAndPassword(auth, email, password);
			const user = userCred.user;
			console.log(`Signed in with ${user.email}`);
			await AsyncStorage.setItem("user", JSON.stringify(user));
			navigation.replace("HomeScreen");
		} catch (error) {
			alert(error.message);
		}
	};

	// FUNCTION TO SIGN USER UP
	const userSignUp = async () => {
		console.log("User sign up page");
		navigation.replace("SignUpScreen");
	};

	// USE EFFECT HOOK TO CHECK IF A USER IS STORED IN ASYNC STORAGE AND NAVIGATE TO THE HOMESCREEN IF SO
	useEffect(() => {
		const checkUser = async () => {
			try {
				const storedUser = await AsyncStorage.getItem("user");
				console.log(`USER IN ASYNC STORAGE ${storedUser}`);
				if (storedUser) {
					setUser(JSON.parse(storedUser)); // if stored data is found then upodate the state with user info
					navigation.replace("HomeScreen");
				}
			} catch (error) {
				alert(error.message);
			}
		};
		checkUser();
	}, []);

	// JSX TEMPLATE TO RETURN THE UI
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/BG_IMG_3.jpeg")}
				style={styles.backgroundImage}>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Image
						source={require("../assets/icon_img.jpg")}
						style={styles.imageStyle}
					/>
				</View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
						<TouchableOpacity style={buttonStyle} onPress={userLogin}>
							<Text style={{ color: "white" }}>L O G I N</Text>
						</TouchableOpacity>
						<View style={{ marginTop: 60, padding: 20 }}>
							<Text
								style={{ fontWeight: "bold", fontSize: 14 }}
								onPress={userSignUp}>
								Don't have an account? Sign Up
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		justifyContent: "center",
	},
	imageStyle: {
		height: "10%",
		width: "20%",
		padding: 50,
		marginTop: 50,
		borderRadius: 50,
	},
});
