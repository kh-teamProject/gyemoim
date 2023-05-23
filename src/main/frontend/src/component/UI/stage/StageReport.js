import React from "react";
import { PDFViewer, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";



const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 60,
        backgroundColor: "white",
    },
    title: {
        fontSize: 55,
        textAlign: "center",
    },
    text: {
        fontSize: 15,
        textAlign: "center",
    },
});

const StageReport = () => {

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>수익보고서</Text>
          <Text style={styles.text}>김찬희</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default StageReport;
