import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import { auth, signOut } from "./Firebase/Firebase_Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
	// DEFINING STYLING FOR VARIOUS COMPONENTS USING REACT NATIVE PAPER
	const theme = useTheme();
	const userEmailView = {
		backgroundColor: theme.colors.backdrop,
		height: "10%",
		width: "70%",
		borderRadius: 20,
		justifyContent: "center",
		margin: 20,
		alignItems: "center",
		marginLeft: 1,
	};
	const welcomeMesageView = {
		backgroundColor: theme.colors.backdrop,
		borderRadius: 20,
		width: "100%",
		height: "10%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	};
	const buttonStyle = {
		height: 50,
		width: 150,
		backgroundColor: theme.colors.onSurface,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	};
	const logOutButtonStyle = {
		height: 50,
		width: 150,
		backgroundColor: theme.colors.error,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "94%",
	};

	// LOG OUT FUNCTION
	const logOut = async () => {
		try {
			await signOut(auth);
			await AsyncStorage.removeItem("user");
			navigation.replace("LoginScreen");
			console.log("User logged out");
		} catch (error) {
			alert(error.message);
		}
	};

	// JSX TEMPLATE TO RETURN THE UI
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/HS_BG_IMG3.jpg")}
				style={styles.backgroundImage}>
				<View style={userEmailView}>
					<Text
						style={{
							color: "white",
							fontWeight: "condensedBold",
							fontSize: 12,
						}}>
						Signed in as: {auth.currentUser?.email}
					</Text>
				</View>
				<View style={welcomeMesageView}>
					<Text style={styles.welcomeText}>WELCOME TO GIT USERS!</Text>
					<Text style={styles.welcomeText}>
						YOUR ONE STOP SHOP FOR FINDING GIT PROFILES
					</Text>
					<Text style={styles.welcomeText}>
						CLICK THE 'GET' BUTTON BELOW TO FETCH SOME USERS
					</Text>
				</View>
				<TouchableOpacity style={buttonStyle}>
					<Text style={styles.welcomeText}>G E T</Text>
				</TouchableOpacity>

				<TouchableOpacity style={logOutButtonStyle} onPress={logOut}>
					<Text style={styles.welcomeText}>L O G O U T</Text>
				</TouchableOpacity>
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
		justifyContent: "flex-start",
	},
	welcomeText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
	},
});
