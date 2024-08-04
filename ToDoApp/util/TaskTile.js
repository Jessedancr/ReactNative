import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function TaskTile(props) {
	const { task, dateTime } = props;

	// FUNCTION TO EXTRACT TIME FROM DATETIME
	const extractTime = (datetime) => {
		const date = new Date(datetime);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		// FORMAT HOURS, MINUTES AND SECONDS TO ALWAYS BE 2 DIGITS
		const formattedHours = hours.toString().padStart(2, "0");
		const formattedMinutes = minutes.toString().padStart(2, "0");
		const formattedSeconds = seconds.toString().padStart(2, "0");

		return `${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
	};
	return (
		<View style={styles.taskTile}>
			<View style={styles.squareItemView}>
				<TouchableOpacity style={styles.squareItem}></TouchableOpacity>
				<View style={styles.timeStampView}>
					<Text style={styles.timeStampStyle}>{extractTime(dateTime)}</Text>
				</View>
			</View>
			<View style={{ marginTop: 20 }}>
				<Text style={{ fontWeight: "500" }}>{task}</Text>
			</View>
		</View> /*OVERALL VIEW FOR TASK TILE */
	);
}

const styles = StyleSheet.create({
	taskTile: {
		flexDirection: "column",
		backgroundColor: "white",
		padding: 25,
		borderRadius: 10,
		marginBottom: 20,
	},
	squareItemView: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	squareItem: {
		width: 24,
		height: 24,
		backgroundColor: "darkblue",
		opacity: 0.4,
		borderRadius: 5.0,
		marginRight: 10,
	},
	timeStampView: {
		height: 25,
		width: "60%",
		borderRadius: 6.0,
		borderWidth: 2.0,
		BorderColor: "darkblue",
		justifyContent: "center",
		alignItems: "center",
	},
	timeStampStyle: {
		fontWeight: "bold",
		fontSize: 18,
	},
});
