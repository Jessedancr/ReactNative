import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	signOut,
	onAuthStateChanged,
	getReactNativePersistence,
	initializeAuth,
} from "firebase/auth";

// FIREBASE CONFIGURATIONS
const firebaseConfig = {
	apiKey: "AIzaSyC5fvhH5FmX-e1dp6tc__GQwlEE5oUJZKY",
	authDomain: "gitusers-e3649.firebaseapp.com",
	projectId: "gitusers-e3649",
	storageBucket: "gitusers-e3649.appspot.com",
	messagingSenderId: "178768768838",
	appId: "1:178768768838:web:663a149c25dd57dc013f47",
	measurementId: "G-7CMMTS1MQV",
};

const initApp = initializeApp(firebaseConfig); // Initializing Firebase

const auth = initializeAuth(initApp, {
	persistence: getReactNativePersistence(AsyncStorage),
});
onAuthStateChanged(auth, async (user) => {
	if (user) {
		await AsyncStorage.setItem("user", JSON.stringify(user));
	} else {
		await AsyncStorage.removeItem("user");
	}
});

export { auth, initApp, onAuthStateChanged, signOut };
