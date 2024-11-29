import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GetStartedComponent from "../GetStartedComponent";
import { CustomModal } from "../Modals/CustomModal";
import { TextInput } from "react-native-paper";

// Mock
jest.mock("./Modals/Modal", () => ({
  Modal: ({ isOpen, children }) => (isOpen ? children : null),
}));

describe("GetStartedComponent", () => {
  test("renders GetStartedComponent and opens the modal", () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByText, getByTestId } = render(
      <GetStartedComponent
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Check button is rendered
    expect(getByText("Add Notes Set")).toBeTruthy();

    // Simulate BUTTON PRESS
    fireEvent.press(getByText("Add Notes Set"));

    // Ensure the modal openS
    expect(getByTestId("modal")).toBeTruthy();
  });

  test('disables "Select document to finish" button if titles are invalid', () => {
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <GetStartedComponent
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    fireEvent.press(getByText("Add Notes Set"));

    // Check invalid strings
    fireEvent.changeText(getByPlaceholderText("Title Of Set. i.e Maths"), "M");
    fireEvent.changeText(
      getByPlaceholderText("Title Of Subject. i.e Calculus"),
      "Ca"
    );

    // Ensure the "Select document to finish" button is disabled
    expect(getByTestId("document-button")).toBeDisabled();
  });

  test('enables "Select document to finish" button when titles are valid', () => {
    const docPicker = jest.fn();
    const subjectTitle = "Calculus";
    const setsTitle = "Maths";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByText, getByTestId } = render(
      <GetStartedComponent
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    fireEvent.press(getByText("Add Notes Set"));

    expect(getByTestId("document-button")).toBeEnabled();
  });
});

describe("CustomModal", () => {
  test("validates set title input", () => {
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

    // Check for validation text
    fireEvent.changeText(getByPlaceholderText("Title Of Set. i.e Maths"), "M");
    expect(getByText("Atleast 3 Characters")).toBeTruthy();

    fireEvent.changeText(
      getByPlaceholderText("Title Of Subject. i.e Calculus"),
      "S"
    );
    expect(getByText("Atleast 3 Characters")).toBeTruthy();

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

  test("closes modal on close button press", () => {
    const setIsModalOpen = jest.fn();
    const docPicker = jest.fn();
    const subjectTitle = "";
    const setsTitle = "";
    const onSubjectTitleChange = jest.fn();
    const onSetsTitleChange = jest.fn();

    const { getByTestId } = render(
      <CustomModal
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    );

    // Close Modal
    fireEvent.press(getByTestId("close-modal-button"));
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
