import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import SignupScreen from "./Screens/SignupScreen";
import CompaniesScreen from "./Screens/CompaniesScreen";
import AddCompanyScreen from "./Screens/AddCompanyScreen";
import SalesScreen from "./Screens/SalesScreen";
import AddSaleScreen from "./Screens/AddSaleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: true }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Companies"
          component={CompaniesScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="AddCompany"
          component={AddCompanyScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Sales"
          component={SalesScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="AddSale"
          component={AddSaleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
