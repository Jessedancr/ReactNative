import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const API_KEY = "d555e955dc8847d68a1cc1c1a40d527f";

export default function App() {
	let [loading, setLoading] = useState(true);
	let [error, setError] = useState(); // IF FOR SOME REASON CALLING THE API FAILS
	let [data, setData] = useState([]);

	/*THE USE EFFECT HOOK TO MAKE SURE WE'RE ONLY CALLING THE API ONCE */
	useEffect(() => {
		fetch(
			`https://api.weatherbit.io/v2.0/current?lat=6.465422&lon=3.406448&key=${API_KEY}`,
		) //Fetching the API
			.then((response) => response.json()) // Getting the JSON from the API
			.then(
				(jsonResult) => {
					setLoading(false);
					setData(jsonResult);
				},
				(error) => {
					setLoading(false);
					setError(error);
				}, // THIS COVERS FAILING TO CALL API FOR WHATEVER REASON
			)
			.catch((err) => {
				alert(err);
			});
	}, []);

	const getContent = () => {
		if (loading) {
			return <ActivityIndicator size="large" />;
		} else if (error) {
			return <Text>{error}</Text>;
		} else {
			const jsonData = data?.data?.[0];
			console.log(data);
			return (
				<View style={styles.textView}>
					<Text style={styles.cityName}>
						CITY NAME {jsonData ? jsonData.city_name : "..."}
					</Text>

					<Text style={styles.timezone}>
						TIME ZONE: {jsonData ? jsonData.timezone : "..."}{" "}
					</Text>

					<Text style={styles.datetime}>
						DATE $ TIME: {jsonData ? jsonData.datetime : "..."}
					</Text>

					<Text style={styles.temp}>
						TEMPERATURE: {jsonData ? jsonData.app_temp : "..."}
					</Text>
				</View>
			);
		}
	}; /* FUNCTION FOR LOADING */

	return (
		<View style={styles.container}>
			{getContent()}
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
	textView: {
		backgroundColor: "grey",
	},
	cityName: {
		fontSize: 20,
		fontWeight: "bold",
	},
	timezone: { fontSize: 20, fontWeight: "bold" },
	datetime: { fontSize: 20, fontWeight: "bold" },
	temp: { fontSize: 20, fontWeight: "bold" },
});
