// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import * as FileSystem from "expo-file-system";
// import { WebView } from "react-native-webview";

// const pdfUri =
//   "https://assets.openstax.org/oscms-prodcms/media/documents/Algebra-and-Trigonometry-2e-WEB.pdf";

// const Demo = () => {
//   const [loading, setLoading] = useState(true);
//   const [pdfPath, setPdfPath] = useState("");

//   useEffect(() => {
//     const downloadPdf = async () => {
//       try {
//         const { uri } = await FileSystem.downloadAsync(
//           pdfUri,
//           FileSystem.documentDirectory + "sample.pdf"
//         );
//         setPdfPath(uri);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     downloadPdf();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centeredContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!pdfPath) {
//     return (
//       <View style={styles.centeredContainer}>
//         <Text>An error occurred while downloading the PDF file.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <WebView
//         style={styles.webView}
//         source={{ uri: pdfPath }}
//         originWhitelist={["*"]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     flex: 1,
//   },
//   webView: {
//     flex: 1,
//   },
// });

// export default Demo;
