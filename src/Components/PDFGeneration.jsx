import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import axios from 'axios';
import logoImage from '../img/cornervictor.png';

// Function to fetch the logo image
const fetchLogoImageBytes = async () => {
  try {
    // Convert the imported image to a Uint8Array
    const imageArrayBuffer = new Uint8Array(await (await fetch(logoImage)).arrayBuffer());
    return imageArrayBuffer;
  } catch (error) {
    console.error('Error fetching logo image:', error);
    return null; // Return null to indicate failure
  }
};

const PDFGeneration = ({ signature }) => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [formData, setFormData] = useState([]);
  const [questionTextData, setQuestionTextData] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('/api/getFormData');
        const formDataFromBackend = response.data.formData;
        setFormData(formDataFromBackend);

        const extractedQuestionTextData = extractQuestionTextData(formDataFromBackend);
        setQuestionTextData(extractedQuestionTextData);

        console.log(formDataFromBackend);
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

      try {
        await Promise.all(
          formData.map(async (data) => {
            data.sections.forEach(async (section) => {
              const page = pdfDoc.addPage();
              const { width, height } = page.getSize();
              let yOffset = height - fontSize;

              // Add the header with the logo
              const logoImageBytes = await fetchLogoImageBytes();

              if (!logoImageBytes) {
                console.warn('Logo image fetch failed. Using fallback content.');
                return;
              }

              console.log('Logo image fetched successfully'); // Add this line

              const logoImage = await pdfDoc.embedPng(logoImageBytes);

              const logoWidth = 100;
              const logoHeight = (logoWidth / logoImage.width) * logoImage.height;
              const logoX = 50;
              const logoY = height - logoHeight - 20;

              // Use PDFImage for the logo
              const pdfLogoImage = page.drawImage(logoImage, {
                x: logoX,
                y: logoY,
                width: logoWidth,
                height: logoHeight,
                rotate: degrees(0),
              });

              // Draw section title
              page.drawText(`Section: ${section.section}`, {
                x: 50,
                y: yOffset,
                size: fontSize + 2,
                color: rgb(0, 0, 0),
              });

              console.log(`Section: ${section.section} added`); // Add this line

              section.answers.forEach((item) => {
                const questionId = item.questionId;
                const questionText = item.questionText || 'Question Text Not Found';
                const answer = item.answer?.answer || 'N/A';

                yOffset -= 2 * fontSize;

                page.drawText(`Question: ${questionText}`, {
                  x: 50,
                  y: yOffset,
                  size: fontSize,
                  color: rgb(0, 0, 0),
                });

                page.drawText(`Answer: ${answer}`, {
                  x: 50,
                  y: yOffset - fontSize,
                  size: fontSize,
                  color: rgb(0, 0, 0),
                });

                yOffset -= 2 * fontSize;
              });

              // Add a section to display the form data
              yOffset -= 2 * fontSize;

              formData.forEach((data) => {
                data.sections.forEach((section) => {
                  section.answers.forEach((item) => {
                    const questionText = item.questionText || 'Question Text Not Found';
                    const answer = item.answer?.answer || 'N/A';

                    page.drawText(`Question: ${questionText}`, {
                      x: 50,
                      y: yOffset,
                      size: fontSize,
                      color: rgb(0, 0, 0),
                    });

                    page.drawText(`Answer: ${answer}`, {
                      x: 50,
                      y: yOffset - fontSize,
                      size: fontSize,
                      color: rgb(0, 0, 0),
                    });

                    yOffset -= 2 * fontSize;
                  });
                });
              });
            });
          })
        );

        const generatedPdfBytes = await pdfDoc.save();
        setPdfBytes(generatedPdfBytes);

        console.log('PDF generated successfully'); // Add this line
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
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

  const extractQuestionTextData = (formData) => {
    const extractedData = [];

    formData.forEach((data) => {
      data.sections.forEach((section) => {
        section.answers.forEach((item) => {
          const questionId = item.questionId;
          const questionText = item?.questionText || 'Question Text Not Found';

          extractedData.push({ questionId, questionText });
        });
      });
    });

    return extractedData;
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
