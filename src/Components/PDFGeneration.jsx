import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';

const PDFGeneration = ({ signature }) => {
//   const [pdfBytes, setPdfBytes] = useState(null);
//   const [formData, setFormData] = useState([]);

//   useEffect(() => {
//     const fetchDataFromBackend = async () => {
//       try {
//         const response = await axios.get('/api/getFormData');
//         const formDataFromBackend = response.data.formData; // Access formData from the response
//         setFormData(formDataFromBackend);
//         console.log(formDataFromBackend)
//       } catch (error) {
//         console.error('Error fetching form data:', error);
//       }
//     };

//     fetchDataFromBackend();
//   }, []);
//   useEffect(() => {
//     const createPDF = async () => {
//       const pdfDoc = await PDFDocument.create();
//       const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
//       const page = pdfDoc.addPage();
//       const { width, height } = page.getSize();
//       const fontSize = 12; // Adjust the font size as needed
  
//       // Define the starting y-position for content
//       let yPosition = height - 2 * fontSize;
  
//       // Loop through the fetched data and add content to the PDF
//       formData.forEach((item) => {
//         const itemName = item?.name || "N/A";
//         const itemValue = item.value || "N/A"; 
//         console.log(`Name: ${item?.name}, Value: ${item.?value}`);

//         const itemText = `${itemName}: ${itemValue}`;
  
//         // Add content to the PDF
//         page.drawText(itemText, {
//           x: 50,
//           y: yPosition,
//           size: fontSize,
//           color: rgb(0, 0, 0),
//         });
  
//         // Move the y-position down for the next item
//         yPosition -= 2 * fontSize; // You can adjust the spacing as needed
//       });
  
//       const generatedPdfBytes = await pdfDoc.save();
//       setPdfBytes(generatedPdfBytes);
//     };
  
//     createPDF();
//   }, [signature, formData]);
  
//   const handleDownload = () => {
//     if (pdfBytes) {
//       const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'example.pdf';
//       link.click();
//     }
//   };

//   return (
//     <div className="Download">
//       <p>If the form hasn't been downloaded automatically</p>
//       <p>
//         to your computer, you can use this
//         <span className="bolder-link" onClick={handleDownload}> link</span> to initiate
//       </p>
//       <p>the download.</p>
//     </div>
//   );
};

export default PDFGeneration;
 