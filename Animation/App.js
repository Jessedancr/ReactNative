import React, { useRef } from "react";
import { Button, Animated, View } from "react-native";

const port = process.env.PORT || 8080

export default function MyComponent() {
	const value = useRef(new Animated.Value(0));

	const startAnimationTiming = () => {
		Animated.timing(value.current, {
			toValue: 1,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	};

	const startSpringAnimation = () => {
		Animated.spring(value.current, {
			toValue: 1,
			friction: 1,
			tension: 300,
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<>
				<Button title="Start Timing Animation" onPress={startAnimationTiming} />
				<Button title="Start Spring Animation" onPress={startSpringAnimation} />
				<Animated.Text style={{ opacity: value.current, fontSize: 42 }}>
					Hello!
				</Animated.Text>
			</>
		</View>
	);
}




// import React, { useRef } from "react";
// import { View, Text, Button, Animated, StyleSheet } from "react-native";

// export default function MyComponent() {
// 	const animatedValue = useRef(new Animated.Value(0)).current;

// 	const startTimingAnimation = () => {
// 		Animated.timing(animatedValue, {
// 			toValue: 1,
// 			duration: 1000,
// 			useNativeDriver: true,
// 		}).start();
// 	};

// 	const startSpringAnimation = () => {
// 		Animated.spring(animatedValue, {
// 			toValue: 1,
// 			friction: 1,
// 			tension: 300,
// 			useNativeDriver: true,
// 		}).start();
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<Button title="Start Timing Animation" onPress={startTimingAnimation} />
// 			<Button title="Start Spring Animation" onPress={startSpringAnimation} />
// 			<Animated.View style={[styles.box, { opacity: animatedValue }]} />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	box: {
// 		width: 100,
// 		height: 100,
// 		backgroundColor: "blue",
// 		marginTop: 20,
// 	},
// });
