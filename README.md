
# Study Buddy

## Description

**Study Buddy** is a React Native app designed to help students transform their lecture notes into interactive quizzes. This app allows users to upload documents (PDF, DOCX, PPTX), extract the text content, and generate quizzes based on the extracted information. With Study Buddy, you can test your knowledge and enhance your studying experience in a fun and engaging way.


## Screenshots

<div style="display:flex;" >

<img src="/StudyBuddy/assets/screenshots/1.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/2.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/3.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/4.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/5.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/6.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/6.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/7.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/8.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/9.PNG" width="20%" >
<img src="/StudyBuddy/assets/screenshots/10.PNG" width="20%" >

</div>

## Features

- **Document Upload:** Pick and upload documents from your device storage.
- **Text Extraction:** Extract text content from uploaded documents using a Node.js server that parses the documents.
- **Quiz Generation:** Automatically generate quizzes from your study/lecture study material content to assist with your studying.
- **Multiple Choice Quizzes:** All quizzes are in multiple-choice format.
- **Progress Tracking:** Track your progress as you complete the quizzes.
- **Score Display:** View your score at the end of each quiz.

## How It Works

1. **Upload Notes:**

   - Use the document picker to upload your lecture notes.
   - The app sends the document to a backend API that parses the document and extracts its text-content.

2. **Generate Quiz:**

   - Once the text is extracted, it is sent to OpenAI API to generate quiz questions.
   - The app parses the quiz questions into a structured format.

3. **Take the Quiz:**
   - Start the quiz and answer the multiple-choice questions.
   - Track your progress and view your score at the end.

## Code Overview

### Technologies Used

- **React Native:** For building the mobile app.
- **Expo:** For easy development and deployment.
- **axios:** For making HTTP requests to the backend API.
- **twrnc:** Tailwind CSS for styling.
- **Node.js:** Backend server for text extraction and quiz generation.
- **NPM:** Package manager

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Expo CLI installed.

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the Expo server with `expo start`.

### Running the App

1. Run the backend server for text extraction and quiz generation.
2. Open the Expo app on your mobile device or use an emulator.
3. Scan the QR code provided by the Expo server to run the app on your device.

### API KEYS

1. Generate your own OpenAI API key to use the backend

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements. I will look at them

## License

This project is licensed under the MIT License.

---

With Study Buddy, you can seamlessly convert your study material into engaging quizzes to make learning more interactive and effective. Happy studying!

