import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees, PageSizes } from 'pdf-lib';
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
      const pageWidth = PageSizes.A4[0]; // Width of A4 page
      const pageHeight = PageSizes.A4[1]; // Height of A4 page
      const margin = 0; // Remove left margin
      const logoWidth = 60; // Adjust logo width
      const logoHeight = 30; // Adjust logo height
      const logoMarginTop = 20; // Margin from the top of the page

      try {
        let page = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = page.getSize();
        let yOffset = height - margin;
        let sectionTopMargin = 20; // Margin from the top of each section

        // Fetch and embed the logo image for the entire document
        const logoImageBytes = await fetchLogoImageBytes();
        if (!logoImageBytes) {
          console.warn('Logo image fetch failed. Using fallback content.');
        } else {
          const logoImage = await pdfDoc.embedPng(logoImageBytes);
          const logoX = margin;
          const logoY = height - logoHeight - logoMarginTop;

          // Add the logo to the top-left corner
          page.drawImage(logoImage, {
            x: logoX,
            y: logoY,
            width: logoWidth,
            height: logoHeight,
            rotate: degrees(0),
          });

          // Add space below the logo
          yOffset = logoY - 20;

          // Add horizontal line after the space
          page.drawLine({
            start: { x: margin, y: yOffset },
            end: { x: width - margin, y: yOffset },
            thickness: 1,
            color: rgb(0, 0, 0), // Black color
          });

          // Add space below the horizontal line
          yOffset -= 20;
        }

        for (const data of formData) {
          for (const section of data.sections) {
            // Highlight the section title with custom color (orange)
            const sectionColor = rgb(229 / 255, 82 / 255, 4 / 255); // #E55204 in RGB format
            page.drawText(`Section: ${section.section}`, {
              x: margin + logoWidth + 10, // Adjust x-coordinate for section title
              y: yOffset - sectionTopMargin,
              size: fontSize + 2,
              color: sectionColor,
            });

            yOffset -= fontSize + 2 + sectionTopMargin;

            for (const item of section.answers) {
              const questionText = item.questionText || 'Question Text Not Found';
              const answer = item.answer?.answer || 'N/A';

              // Add question
              page.drawText(questionText, {
                x: margin + logoWidth + 10, // Adjust x-coordinate for question
                y: yOffset,
                size: fontSize,
                color: rgb(0, 0, 0), // Black color
              });

              yOffset -= fontSize + 2;

              // Add answer
              page.drawText(answer, {
                x: margin + logoWidth + 10, // Adjust the x-coordinate for answer placement
                y: yOffset,
                size: fontSize,
                color: rgb(0, 0, 0), // Black color
              });

              yOffset -= fontSize + 2;
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
