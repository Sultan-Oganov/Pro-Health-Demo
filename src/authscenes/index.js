import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import LoginEmail from "./LoginEmail";
import Registration from "./Registration";
import NewPassword from "./NewPassword";

const AuthScenes = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "red" } }}
      >
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="LoginEmail"
          options={{ headerShown: false }}
          component={LoginEmail}
        />
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />
        <Stack.Screen
          name="NewPassword"
          options={{ headerShown: false }}
          component={NewPassword}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthScenes;
