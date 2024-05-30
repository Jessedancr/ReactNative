import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function TaskTile(props) {
    const timeStamp = new Date().toString();
	return (
		<View style={styles.taskTile}>
			<View style={styles.leftItem}>
				<TouchableOpacity style={styles.square}></TouchableOpacity>
				<Text style={styles.itemText}>{props.task}</Text>
			</View>
			{/*  */}
			<View style={styles.circular}>
				<Text>{timeStamp}</Text>
			</View>
		</View> /*OVERALL VIEW FOR TASK TILE */
	);
}

const styles = StyleSheet.create({
	taskTile: {
		backgroundColor: "white",
		padding: 25,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	leftItem: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	square: {
		width: 24,
		height: 24,
		backgroundColor: "darkblue",
		opacity: 0.4,
		borderRadius: 5.0,
		marginRight: 10,
	},
	text: {},
	circular: {
		// height: 25,
		// width: 100,
		// borderRadius: 6.0,
		// borderWidth: 2.0,
		// BorderColor: "darkblue",
		// justifyContent: "center",
	},
});
