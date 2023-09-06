import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import axios from 'axios';
import logoImage from '../img/cornervictor.png';

const PDFGeneration = ({ signature }) => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('/api/getFormData');
        const formDataFromBackend = response.data.formData;
        setFormData(formDataFromBackend);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchDataFromBackend();
  }, []);

  useEffect(() => {
    const createPDF = async () => {
      if (formData.length === 0) {
        console.warn('formData is empty');
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const fontSize = 12;
      const pageWidth = 612; // Letter-sized paper (8.5 x 11 inches)
      const pageHeight = 792;
      const margin = 50; // Adjust margins as needed
      const logoMarginBottom = 20; // Margin between logo and data
      const lineHeight = fontSize * 1.5;

      try {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = page.getSize();
        let yOffset = height - margin;

        // Fetch and embed the logo image
        const logoImageBytes = await fetchLogoImageBytes();
        if (!logoImageBytes) {
          console.warn('Logo image fetch failed. Using fallback content.');
        } else {
          const logoImage = await pdfDoc.embedPng(logoImageBytes);
          const logoWidth = 100;
          const logoHeight = (logoWidth / logoImage.width) * logoImage.height;
          const logoX = margin;
          const logoY = height - logoHeight - margin;
          page.drawImage(logoImage, {
            x: logoX,
            y: logoY,
            width: logoWidth,
            height: logoHeight,
            rotate: degrees(0),
          });

          // Adjust yOffset to add space below the logo
          yOffset = logoY - logoMarginBottom;
        }

        for (const data of formData) {
          for (const section of data.sections) {
            // Add section title
            page.drawText(`Section: ${section.section}`, {
              x: margin,
              y: yOffset,
              size: fontSize + 2,
              color: rgb(0, 0, 0),
            });

            yOffset -= fontSize + 2;

            for (const item of section.answers) {
              const questionText = item.questionText || 'Question Text Not Found';
              const answer = item.answer?.answer || 'N/A';

              // Add question and answer
              page.drawText(`Question: ${questionText}`, {
                x: margin,
                y: yOffset,
                size: fontSize,
                color: rgb(0, 0, 0),
              });

              page.drawText(`Answer: ${answer}`, {
                x: margin + 400, // Adjust the x-coordinate for answer placement
                y: yOffset,
                size: fontSize,
                color: rgb(0, 0, 0),
              });

              yOffset -= lineHeight;
            }
          }
        }

        const generatedPdfBytes = await pdfDoc.save();
        setPdfBytes(generatedPdfBytes);

        console.log('PDF generated successfully');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

    createPDF();
  }, [formData]);

  const fetchLogoImageBytes = async () => {
    try {
      const response = await fetch(logoImage);
      if (!response.ok) {
        console.warn('Failed to fetch logo image:', response.status);
        return null;
      }
      const imageArrayBuffer = new Uint8Array(await response.arrayBuffer());
      return imageArrayBuffer;
    } catch (error) {
      console.error('Error fetching logo image:', error);
      return null;
    }
  };

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
      {pdfBytes ? (
        <>
          <p>If the form hasn't been downloaded automatically</p>
          <p>
            you can use this <span className="bolder-link" onClick={handleDownload}>link</span> to initiate
          </p>
          <p>the download.</p>
        </>
      ) : (
        <p>Generating PDF...</p>
      )}
    </div>
  );
};

export default PDFGeneration;
