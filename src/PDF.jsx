import React, { useEffect, useState, useRef } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";


const PDF = () => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const createPDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 30;

   
      const contentText = contentRef.current.textContent;
      page.drawText(contentText, {
        x: 50,
        y: height - 6 * fontSize, 
        size: fontSize,
        color: rgb(0, 0, 0), 
      });

      const generatedPdfBytes = await pdfDoc.save();
      setPdfBytes(generatedPdfBytes);
    };

    createPDF();
  }, []);

  const handleDownload = () => {
    if (pdfBytes) {
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "example.pdf";
      link.click();
    }
  };

  return (
    <div className="pdf">
      <p ref={contentRef}>Hello, my name is Melissa!!</p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PDF;
