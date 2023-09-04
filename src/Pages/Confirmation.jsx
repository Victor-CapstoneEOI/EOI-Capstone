import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import '../Styles/Confirmation.css';

export const Confirmation = () => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const signature = queryParams.get('signature');

  useEffect(() => {
    const createPDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 30;

      page.drawText(`Hello, ${signature}!!`, {
        x: 50,
        y: height - 6 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const generatedPdfBytes = await pdfDoc.save();
      setPdfBytes(generatedPdfBytes);
    };

    createPDF();
  }, [signature]);

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
    <div className='confirmation'>
      <div className="half-top">
        <div className="ThankYou">
          <p>Thanks for joining.</p>
          <p>Your registration is complete</p>
        </div>
      </div>
      <div className="half-bottom">
        <div className="Download">
          <p>If the form hasn't been downloaded automatically</p>
          <p>
            to your computer, you can use this 
            <span className="bolder-link" onClick={handleDownload}> link</span> to initiate
          </p>
          <p>the download.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
