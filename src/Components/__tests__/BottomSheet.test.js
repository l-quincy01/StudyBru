import React from "react";
import { render } from "@testing-library/react-native";
import BottomSheet from "../BottomSheet";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons"; // Ensure you import the correct icon libraries

describe("BottomSheet", () => {
  test("renders correctly with all options", () => {
    const { getByText, getAllByType } = render(<BottomSheet />);

    // Check if the main title is rendered
    expect(getByText("Options")).toBeTruthy();

    // Check if each option is rendered
    expect(getByText("Set as active")).toBeTruthy();
    expect(getByText("Share")).toBeTruthy();
    expect(getByText("Open")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();
  });

  test("renders icons correctly", () => {
    const { getAllByType } = render(<BottomSheet />);

    // Check if the icons are rendered
    const icons = getAllByType(TouchableOpacity);
    expect(icons.length).toBe(4); // Should be 4 options with icons
    expect(icons[0]).toContainElement(<Ionicons name="checkbox-outline" />);
    expect(icons[1]).toContainElement(<Entypo name="share-alternative" />);
    expect(icons[2]).toContainElement(<MaterialIcons name="open-in-new" />);
    expect(icons[3]).toContainElement(<AntDesign name="delete" />);
  });

  test("renders TouchableOpacity components for each option", () => {
    const { getAllByType } = render(<BottomSheet />);

    // Ensure there are 4 TouchableOpacity components (one for each option)
    const touchables = getAllByType(TouchableOpacity);
    expect(touchables.length).toBe(4);
  });

  // Optional: Test styling if needed
  test("has correct styles applied", () => {
    const { getByText } = render(<BottomSheet />);

    const textElement = getByText("Options");
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontSize: 18, // assuming text-lg is equivalent to 18
        fontWeight: "600", // font-semibold
      })
    );
  });
});
