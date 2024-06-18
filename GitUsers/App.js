import LoginScreen from "./src/Login_Screen";
import HomeScreen from "./src/Home_Screen";
import React from "react";
import SignUpScreen from "./src/Signup_Screen";

// NAVIGATION IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// PAPER PROVIDER IMPORTS
import { PaperProvider } from "react-native-paper";
import { MD2DarkTheme as DefaultTheme } from "react-native-paper";

const stack = createNativeStackNavigator();
export default function App() {
	return (
		<PaperProvider>
			
			<NavigationContainer>
				<stack.Navigator
					screenOptions={{
						//headerTransparent: true,
					}}>
					<stack.Screen
						name="LoginScreen"
						component={LoginScreen}
						options={{headerShown: false}}
					/>
					<stack.Screen
						name="HomeScreen"
						component={HomeScreen}
						options={{ headerShown: false}}
					/>
					<stack.Screen
						name="SignUpScreen"
						component={SignUpScreen}
						options={{headerShown: false}}
					/>
				</stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
