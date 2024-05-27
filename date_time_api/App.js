import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	let [data, setData] = useState([]);
	useEffect(() => {
		fetch("https://worldtimeapi.org/api/timezone/Africa/Lagos")
			.then((response) => response.json()) // GETTING THE JSON FROM THE API
			.then((result) => setData(result))
			.catch((err) => alert(err));
	}, []);

	const callApi = () => {
		console.log(data);
		return (
			<View>
				<Text>
					API CALLED: {data.abbreviation} {data.datetime}
				</Text>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			{callApi()}
			<StatusBar style="auto" />
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
});
