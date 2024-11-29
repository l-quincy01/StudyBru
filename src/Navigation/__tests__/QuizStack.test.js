import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import QuizStack from "../QuizStack";

//
jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => <>{children}</>,
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
  }),
}));

jest.mock("../Screens/QuizScreen", () => () => <Text>QuestionsScreen</Text>);
jest.mock("../Screens/EndScreen", () => () => <Text>EndScreen</Text>);

describe("QuizStack", () => {
  test("renders QuizStack with all screens", () => {
    const { getByText } = render(
      <NavigationContainer>
        <QuizStack />
      </NavigationContainer>
    );

    expect(getByText("QuestionsScreen")).toBeTruthy();
    expect(getByText("EndScreen")).toBeTruthy();
  });

  test("QuestionsScreen is rendered first", () => {
    const { getByText } = render(
      <NavigationContainer>
        <QuizStack />
      </NavigationContainer>
    );

    expect(getByText("QuestionsScreen")).toBeTruthy();
  });
});
