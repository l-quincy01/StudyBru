import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "../HomeStackNavigator";

jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => <>{children}</>,
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
  }),
}));

jest.mock("../Screens/SplashScreen", () => () => <Text>SplashScreen</Text>);
jest.mock("../Screens/ProfileScreen", () => () => <Text>ProfileScreen</Text>);
jest.mock("../Screens/AddedNotesScreen", () => () => (
  <Text>AddedNotesScreen</Text>
));
jest.mock("../Screens/NotesDocumentView", () => () => (
  <Text>NotesDocumentView</Text>
));

describe("HomeStackNavigator", () => {
  test("renders HomeStackNavigator with all screens", () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    );

    // Check  each screen
    expect(getByText("SplashScreen")).toBeTruthy();
    expect(getByText("ProfileScreen")).toBeTruthy();
    expect(getByText("AddedNotesScreen")).toBeTruthy();
    expect(getByText("NotesDocumentView")).toBeTruthy();
  });

  test("SplashScreen is rendered first", () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    );

    // Check  SplashScreen displays
    expect(getByText("SplashScreen")).toBeTruthy();
  });
});
