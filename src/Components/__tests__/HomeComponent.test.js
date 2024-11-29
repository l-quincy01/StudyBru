import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeComponentMainModal from "./HomeComponentMainModal"; // Adjust path if needed
import { CustomModal } from "./CustomModal"; // Adjust path if needed
import { TextInput } from "react-native-paper";

// Mock Modal component
jest.mock("./Modal", () => ({
  Modal: ({ isOpen, children }) => (isOpen ? children : null),
}));

describe("HomeComponentMainModal", () => {
  test("opens modal on button press", () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByText } = render(
      <HomeComponentMainModal
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Check button presence and simulate press
    fireEvent.press(getByText("+"));
    expect(getByText("Create New Note Set")).toBeTruthy();
  });

  test("opens and closes modal correctly", () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByText, getByTestId } = render(
      <HomeComponentMainModal
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    fireEvent.press(getByText("+"));
    expect(getByText("Create New Note Set")).toBeTruthy();

    // Simulate closing modal
    fireEvent.press(getByTestId("close-modal-button"));
    expect(getByText("Create New Note Set")).toBeFalsy();
  });
});

describe("CustomModal", () => {
  test("validates title inputs", () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <CustomModal
        isModalOpen={true}
        setIsModalOpen={jest.fn()}
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Check input validation
    fireEvent.changeText(getByPlaceholderText("Title Of Set. i.e Maths"), "M");
    fireEvent.changeText(
      getByPlaceholderText("Title Of Subject. i.e Calculus"),
      "S"
    );
    expect(getByText("Atleast 3 Characters")).toBeTruthy();

    // Valid input
    fireEvent.changeText(
      getByPlaceholderText("Title Of Set. i.e Maths"),
      "Maths"
    );
    fireEvent.changeText(
      getByPlaceholderText("Title Of Subject. i.e Calculus"),
      "Calculus"
    );
    expect(getByText("Atleast 3 Characters")).not.toBeTruthy();
  });

  test("disables button if titles are invalid", () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <CustomModal
        isModalOpen={true}
        setIsModalOpen={jest.fn()}
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Invalid inputs
    fireEvent.changeText(getByPlaceholderText("Title Of Set. i.e Maths"), "M");
    fireEvent.changeText(
      getByPlaceholderText("Title Of Subject. i.e Calculus"),
      "S"
    );
    expect(getByTestId("document-button")).toBeDisabled();
  });

  test("enables button when inputs are valid", () => {
    const docPicker = jest.fn();
    const subjectTitle = "Calculus";
    const setsTitle = "Maths";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByTestId } = render(
      <CustomModal
        isModalOpen={true}
        setIsModalOpen={jest.fn()}
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Valid inputs
    expect(getByTestId("document-button")).toBeEnabled();
  });
});
