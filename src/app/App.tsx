import { registerRootComponent } from "expo";
import { View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

function App() {
  return <AppNavigator />;
}

registerRootComponent(App);

// "expo-router",
// [
//   "expo-splash-screen",
//   {
//     "image": "./src/assets/images/splash-icon.png",
//     "imageWidth": 200,
//     "resizeMode": "contain",
//     "backgroundColor": "#ffffff"
//   }
// ],
