import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Animated,
	ScrollView,
	Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BmiCalculator() {
	/* DEFINING STATE VARIABLES FOR WEIGHT, HEIGHT
	 * BMI VALUE, COMMENT, API IMAGE,
	 * AND IF ERROR OCCURS WHILE CALLING API
	 */
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [bmi, setBmi] = useState("");
	const [comment, setComment] = useState("");
	const [image, setImage] = useState();
	const [error, setError] = useState();

	// API SPECIFIC CODE: ENDPOINT, KEY AND HOST
	const url = "https://any-anime.p.rapidapi.com/v1/anime/png/1";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "e1c2cbb19emshc6be6d190d03288p1e8eb7jsn8c58513b2d0d",
			"X-RapidAPI-Host": "any-anime.p.rapidapi.com",
		},
	};

	// FUNCTION FOR ANIMATING THE BMI VALUE AND COMMENT ON SCREEN
	const value = useRef(new Animated.Value(0));
	const animatedTiming = () => {
		Animated.timing(value.current, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};

	// FUNCTION FOR ANIMATING BMI VALUE AND COMMENT OFF THE SCREEN
	const deleteAnimatedTiming = () => {
		Animated.timing(value.current, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		load();
		try {
			fetch(url, options)
				.then((res) => res.json())
				.then((result) => setImage(result.images[0]));
		} catch (err) {
			alert(err);
			setError(err);
		}
	}, []);

	const calculateBmi = async () => {
		animatedTiming();
		const bmi = weight / (height * height);
		setBmi(bmi.toFixed(2));

		try {
			await AsyncStorage.setItem("myHeight", height);
			await AsyncStorage.setItem("myWeight", weight);
		} catch (err) {
			alert(err);
		}

		if (bmi < 18.5) {
			setComment("Improve your balanced diet! you are underweight");
		} else if (bmi > 18.5 && bmi <= 24.9) {
			setComment("Congrats! you are healthy");
			const images = image.images[0]
			setImage(images);
		} else if (bmi > 25 && bmi <= 30) {
			setComment("Hit the gym! you are overweight");
		} else {
			setComment("Start eating healthy! You are Obese");
		}

		return callApi();
	};

	// FUNCTION TO GET OR LOAD DATA FROM ASYNC STORAGE
	const load = async () => {
		try {
			let height = await AsyncStorage.getItem("myHeight");
			let weight = await AsyncStorage.getItem("myWeight");
			if (height !== null && weight !== null) {
				setHeight(height);
				setWeight(weight);
			}
		} catch (err) {
			alert(err);
		}
	};

	// FUNCTION TO DELETE DATA FROM ASYNC STORAGE
	const DeleteData = async () => {
		deleteAnimatedTiming();
		console.log("Data deleted");
		try {
			await AsyncStorage.removeItem("myHeight");
			await AsyncStorage.removeItem("myWeight");
		} catch (err) {
			alert(err);
		} finally {
			setHeight("");
			setWeight("");
			setBmi("");
			setComment("");
		}
	};

	// FUNCTION TO CALL API
	const callApi = () => {
		console.log("function to call API");
		return (
			<View>
				{image && (
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
				)}
			</View>
		);
	};

	const animatedTextStyle = {
		fontWeight: "bold",
		fontSize: 20,
		opacity: value.current,
	};
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.headerContainer}>
					<Text style={styles.headerTextStyle}>BMI CALCULATOR</Text>
				</View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.bodyContainer}>
						<TextInput
							style={styles.textInputStyle}
							placeholder="Height in m"
							placeholderTextColor={"dimgrey"}
							value={height}
							onChangeText={(height) => setHeight(height)}
							keyboardType="numeric"
						/>

						<View style={{ flexDirection: "row" }}>
							<TextInput
								style={styles.textInputStyle}
								placeholder="Weight In KG"
								placeholderTextColor={"dimgrey"}
								value={weight}
								onChangeText={(weight) => setWeight(weight)}
								keyboardType="numeric"
							/>
						</View>

						<View style={styles.pokeStyle}>
							<Animated.Text style={animatedTextStyle}>
								BMI: {bmi}
							</Animated.Text>
							<Animated.Text style={animatedTextStyle}>{comment}</Animated.Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								width: "100%",
							}}>
							<TouchableOpacity
								style={styles.submitButton}
								onPress={() => calculateBmi()}>
								<Text style={styles.textStyle}>SUBMIT</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.submitButton}
								onPress={() => DeleteData()}>
								<Text style={styles.textStyle}>DELETE</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "teal",
	},
	headerContainer: {
		backgroundColor: "silver",
		padding: 50,
		marginVertical: 35,
		marginHorizontal: 20,
		borderRadius: 10.0,
		alignItems: "center",
	},
	headerTextStyle: {
		fontWeight: "bold",
		fontSize: 18,
	},
	bodyContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	textInputStyle: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginVertical: 10,
		backgroundColor: "silver",
		borderRadius: 10,
		borderColor: "black",
		borderWidth: 1.5,
		width: 280,
	},
	buttontext: {
		textAlign: "center",
		textAlignVertical: "center",
	},
	heightViewStyle: {
		flexDirection: "row",
		paddingBottom: 50,
	},
	pokeStyle: {
		backgroundColor: "transparent",
		height: 200,
		width: 330,
		marginVertical: 10,

		borderRadius: 10.0,
		alignItems: "center",
	},

	submitButton: {
		height: 50,
		width: 150,
		backgroundColor: "silver",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
