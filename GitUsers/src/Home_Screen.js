import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	FlatList,
} from "react-native";
import { useTheme } from "react-native-paper";
import { auth, signOut } from "./Firebase/Firebase_Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
	const [user, setUser] = useState([]);
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
	};
	const buttonStyle = {
		height: 50,
		width: 150,
		backgroundColor: theme.colors.onSurface,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
	};
	const logOutButtonStyle = {
		height: 50,
		width: 150,
		backgroundColor: theme.colors.error,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
	};
	const gitUsersStyle = {
		backgroundColor: theme.colors.backdrop,
		width: "100%",
		height: "50%",
		borderRadius: 10,
		marginTop: "1%",
	};
	const usersStyle = {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: theme.colors.inversePrimary,
		fontSize: 18,
		padding: 20,
		marginTop: 24,
		marginLeft: "20%",
		borderRadius: 30,
		width: "60%",
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

	// API CALL FUNCTION
	const getUsers = async () => {
		try {
			console.log("Api called");
			const response = await fetch("https://api.github.com/users");
			const result = await response.json()
			user = setUser(result);
		} catch {
			(err) => alert(err.message);
		}
	};

	// FUNCTION TO VIEW SPECIFIC DETAILS ABOUT A USER
	const viewUserDetails = async (login) => {
		try {
			const response = await fetch(`https://api.github.com/users/${login}`);
			const result = await response.json();
			navigation.navigate("UserDetails", { UserDetails: result });
		} catch {
			(error) => alert(error.message);
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
				<TouchableOpacity style={buttonStyle} onPress={getUsers}>
					<Text style={styles.welcomeText}>G E T</Text>
				</TouchableOpacity>
				<View style={gitUsersStyle}>
					<FlatList
						data={user}
						renderItem={({ item }) => (
							<>
								<View style={usersStyle}>
									<TouchableOpacity onPress={() => viewUserDetails(item.login)}>
										<Text style={{ fontWeight: "bold", fontSize: 16 }}>
											{item.login}
										</Text>
									</TouchableOpacity>
								</View>
							</>
						)}
					/>
				</View>

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
	usersText: {},
});
