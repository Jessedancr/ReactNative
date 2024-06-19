import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const UserDetails = ({ route }) => {
	// Extract user details fron route.params.
	// "route.params" contains parameters
	// passed from previous screen to this screen
	const { UserDetails } = route.params;

	// STYLING WITH REACT NATIVE PAPER
	const theme = useTheme();
	const userDetailText = {
		fontSize: 18,
		marginBottom: 10,
		color: theme.colors.surfaceVariant,
		fontWeight: "bold",
	};
	const userDetailView = {
		backgroundColor: theme.colors.backdrop,
		borderRadius: 20,
		width: "60%",
	};
	console.log("Received User Details:", UserDetails);

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require("../assets/HS_BG_IMG3.jpg")}
				style={styles.backgroundImage}>
				<View style={userDetailView}>
					<Text style={userDetailText}>Username: {UserDetails?.login}</Text>
					<Text style={userDetailText}>Name: {UserDetails?.name}</Text>

					<Text style={userDetailText}>
						Public Repos: {UserDetails?.public_repos}
					</Text>
				</View>
			</ImageBackground>
		</View>
	);
};
const styles = StyleSheet.create({
	userDetailText: {
		fontSize: 18,
		marginBottom: 10,
		color: "white",
		fontWeight: "bold",
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
});

export default UserDetails;
