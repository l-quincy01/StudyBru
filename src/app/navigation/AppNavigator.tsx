import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../login/LoginScreen";
import { useAuth } from "@/src/context/AuthContext";
import HomeScreen from "../home/HomeScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }} // Customize header options here
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} // Customize header options here
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
