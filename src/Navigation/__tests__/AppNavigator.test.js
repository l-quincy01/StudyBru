import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "../AppNavigator";

// Mocking necessary components to avoid navigation and stack issues
jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => <>{children}</>,
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
  }),
}));

jest.mock("@expo/vector-icons", () => ({
  AntDesign: "AntDesign",
  Ionicons: "Ionicons",
}));

describe("AppNavigator", () => {
  test("renders correctly with navigation tabs", () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Check if "Home" and "Resources" labels are displayed
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Resources")).toBeTruthy();
  });

  test("renders icons correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Check if icon placeholders (AntDesign, Ionicons) are rendered
    expect(getByText("AntDesign")).toBeTruthy();
    expect(getByText("Ionicons")).toBeTruthy();
  });

  test('navigation should show "Home" tab', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    //Check tabs rendered
    fireEvent.press(getByText("Home"));
    expect(getByText("Home")).toBeTruthy();
  });

  test('navigation should show "Resources" tab', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    fireEvent.press(getByText("Resources"));
    expect(getByText("Resources")).toBeTruthy();
  });
});
