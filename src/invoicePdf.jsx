import React, { useState } from 'react';
import { Document,Image, Page, Text, PDFDownloadLink } from '@react-pdf/renderer';
import { View } from '@react-pdf/renderer';

function InvoicePdf(...props) {
  const data = {
    title: 'Invoice',
    content: 'This is some static data that will be included in the PDF document.'
  };

  const [generatePDF, setGeneratePDF] = useState(false);

  const handleClick = () => {
    setGeneratePDF(true);
  };
  const pdfStyles = {
    page: {
      border: 1, // border width
      borderColor: 'black', // border color
      borderStyle: 'solid', // border style
      padding: 100, // padding for the content inside the border
      margin:'10px'
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
  };
  const PDFDocument = () => (
    <Document>
      <Page size="A4">
        <View style={{margin:10,border:2,height:830,width:575}}>
          <View style={{border:1,width:573,marginTop:100,height:0}}>
            <img src="C:\Users\Kush\Documents\Python\twitter1.png"/>
            <View>
            <Text style={{margin:10}}>Buyer's Name:</Text>
            <Text style={{margin:10,marginTop:20}}>Address:</Text>
            <Text style={{margin:10,marginTop:20}}>GST No :</Text>
            </View>
            <View style={{marginLeft:400}}>
              <Text style={{marginTop:-85,}}>Name:</Text>
              <Text>Address:</Text>
              <Text>Ph-no:</Text>
            </View>
            <View style={{marginLeft:410}}><Text style={{marginTop:605}}>Total Amt:</Text></View>
            <View style={{border:1,marginTop:600}}>
            </View>
            <View style={{marginTop:-600,marginLeft:400}}>
              <Text style={{marginTop:10,}}>Invoice No:</Text>
              <Text style={{marginTop:30,}}>Invoice Date:</Text>
            </View>
          </View>
          <View style={{border:1,width:573,marginTop:100,height:0}}>
            <Text style={{marginLeft:10,}}>Sr.No: </Text>
          </View>
          <View style={{marginLeft:100}}>
          <Text style={{marginLeft:10}}>Image</Text>
          </View>
          <View style={{marginLeft:220,marginTop:-18}}> 
          <Text>Qt</Text>
          </View>
          <View style={{marginLeft:330, marginTop:-20}}>
          <Text>Price</Text>
          </View>
          <View style={{marginLeft:450,marginTop:-21}}>
          <Text>Amount</Text>
          </View>
          <View style={{marginTop:400}}></View>
        </View>
      </Page>
    </Document>
  );
  return (
    <div>
      <button onClick={handleClick}>Generate PDF</button>
      {generatePDF && (
        <PDFDownloadLink document={<PDFDocument />} fileName="Invoice.pdf">
          Download PDF
        </PDFDownloadLink>
      )}
    </div>
  );
}

export default InvoicePdf;