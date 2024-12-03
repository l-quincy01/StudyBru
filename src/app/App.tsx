import { registerRootComponent } from "expo";
import { View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "../context/AuthContext";
import "../../global.css";

function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

registerRootComponent(App);
