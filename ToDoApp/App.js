import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TaskTile from "./util/TaskTile";

export default function App() {
	const [task, setTask] = useState("");
	const [taskArray, setTaskArray] = useState([]);

	// FUNCTION TO ADD TASK
	const addTask = async () => {
		const url = "https://worldtimeapi.org/api/timezone/Africa/Lagos";
		Keyboard.dismiss();
		console.log(task);

		try {
			// C A L L I N G  T H E  A P I
			const res = await fetch(url);
			const result = await res.json(); // Parsing the result of the API call
			const dateTime = result.datetime; // Assigning the datetime prop of the API call to a variable

			const newTask = {
				mytask: task,
				taskTime: dateTime,
			};

			// A S Y N C  S T O R A G E
			const updatedTaskArray = [...taskArray, newTask];
			await AsyncStorage.setItem("myTask", JSON.stringify(updatedTaskArray));
			setTaskArray(updatedTaskArray);
			setTask("");
		} catch (err) {
			console.log(err);
		}
	};

	// ASYNC FUNCTION TO LOAD TASKS TO ASYNC STORAGE
	const LoadTasks = async () => {
		try {
			await AsyncStorage.getItem("myTask").then((task) => {
				if (task !== null) {
					setTaskArray(JSON.parse(task));
				}
			});
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		LoadTasks();
	}, []);

	// FUNCTION TO DELETE TASK
	const deleteTask = (index) => {
		let taskArrayCopy = [...taskArray];
		taskArrayCopy.splice(index, 1);
		try {
			AsyncStorage.setItem("myTask", JSON.stringify(taskArrayCopy)).then(() => {
				setTaskArray(taskArrayCopy);
			});
		} catch (err) {
			alert(err);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>TODAY'S TASKS</Text>
				{/*THIS VIEW HOLDS ALL THE TO-DO TASKS*/}
				<ScrollView style={styles.scrollView}>
					{taskArray.map((item, index) => {
						return (
							<TouchableOpacity onPress={() => deleteTask(index)} key={index}>
								<TaskTile
									task={item.mytask}
									dateTime={item.taskTime}></TaskTile>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
			{/* ADD A NEW TASK */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}>
				<TextInput
					style={styles.textInput}
					placeholder="Add a new task"
					value={task}
					onChangeText={(text) => setTask(text)}
				/>
				<TouchableOpacity onPress={() => addTask()}>
					<View style={styles.addTaskView}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View> /* OVERALL VIEW */
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
	},
	header: {
		paddingTop: 60,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	scrollView: {
		marginTop: 5.0,
		marginBottom: 140,
	},
	keyboardAvoidingView: {
		position: "absolute",
		bottom: 40,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	textInput: {
		//flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginLeft: 10,
		backgroundColor: "white",
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 2,
		width: 250,
	},
	addTaskView: {
		width: 60,
		height: 60,
		backgroundColor: "white",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2.0,
	},
	tasksContainer: {
		flex: 1,
		paddingBottom: 10,
	},
	addText: {},
});
