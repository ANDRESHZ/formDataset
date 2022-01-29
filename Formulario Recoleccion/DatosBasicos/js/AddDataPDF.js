const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
 
  // Fetch an existing PDF document
  const url = 'Consentimiento_latex.pdf'//'https://pdf-lib.js.org/assets/with_update_sections.pdf'
  const existingPdfBytes = fetch(url).then(res => res.arrayBuffer());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  
  // Fetch JPEG image
  const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg';
  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
    
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.25);
  

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();
    firstPage.drawText('This text was added with JavaScript!', {
       x: 5,
       y: height / 2 + 300,
       size: 50,
       font: helveticaFont,
       color: rgb(0.95, 0.1, 0.1),
       rotate: degrees(-45),
     });

  
        // Add a blank page to the document


 firstPage.drawImage(jpgImage, {
    x: firstPage.getWidth() / 2 - jpgDims.width / 2,
    y: firstPage.getHeight() / 2 - jpgDims.height / 2,
    width: jpgDims.width,
    height: jpgDims.height,
  });
  
  
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

        // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}