import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Image,
	Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
	let [loading, setLoading] = useState(true);
	let [image, setImage] = useState();
	let [error, setError] = useState();
	const url = "https://any-anime.p.rapidapi.com/v1/anime/png/1";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "e1c2cbb19emshc6be6d190d03288p1e8eb7jsn8c58513b2d0d",
			"X-RapidAPI-Host": "any-anime.p.rapidapi.com",
		},
	};

	useEffect(() => {
		try {
			fetch(url, options)
				.then((res) => res.json())
				.then((result) => setImage(result.images[0]), setLoading(false));
		} catch (error) {
			alert(error);
			setError(error);
		}
	}, []);

	const getData = () => {
		if (loading) {
			return <ActivityIndicator size="large" />;
		} else if (error) {
			return <Text>{error}</Text>;
		} else {
			console.log(image);

			const { width, height } = Dimensions.get("window");
			return (
				<View>
					{image && (
						<Image
							source={{
								uri: image,
							}}
							style={{ width: width, height: 400 }}
						/>
					)}
				</View>
			);
		}
	};
	return <View style={styles.container}>{getData()}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "pink",
		justifyContent: "center",
		alignItems: "center",
	},
});
