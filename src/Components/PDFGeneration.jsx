import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';

const PDFGeneration = ({ signature, formData }) => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('/api/getFormData'); 
        const formDataFromBackend = response.data;
        setFormData(formDataFromBackend);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchDataFromBackend();
  }, []);

  useEffect(() => {
    const createPDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 30;

      // Placeholder text. You can insert form data here as well
      page.drawText(`Hello, ${signature}!!`, {
        x: 50,
        y: height - 6 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      // TODO: Insert the form data into the PDF as you see fit

      const generatedPdfBytes = await pdfDoc.save();
      setPdfBytes(generatedPdfBytes);
    };

    createPDF();
  }, [signature, formData]);

  const handleDownload = () => {
    if (pdfBytes) {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'example.pdf';
      link.click();
    }
  };

  return (
    <div className="Download">
      <p>If the form hasn't been downloaded automatically</p>
      <p>
        to your computer, you can use this 
        <span className="bolder-link" onClick={handleDownload}> link</span> to initiate
      </p>
      <p>the download.</p>
    </div>
  );
};

export default PDFGeneration;