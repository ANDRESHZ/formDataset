const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function onMyfileChange(fileInput) {
  if (fileInput.files[0] == undefined) {
    return;
  }
  // Example of what information you can read
  // var filename = fileInput.files[0].name;
  // var filesize = fileInput.files[0].size;
  var reader = new FileReader();
  reader.onload = function (ev) {
    var content = ev.target.result; // content is an ArrayBuffer object
    console.log("Successfully read file");
  };
  reader.onerror = function (err) {
    console.error("Failed to read file", err);
  }
  reader.onloadend = function (ev) {
    var existingPdfBytes2 = ev.target.result;
    var save = 'function ObtainB64(){\r\n      var datosb64="' + arrayBufferToBase64(existingPdfBytes2) + '";\r\n    return datosb64;\r\n  }';
    var blob = new Blob([save], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "dataB64.js");
  };

  reader.readAsArrayBuffer(fileInput.files[0]);
}

async function modifyPdf() {

  // Fetch an existing PDF document
  // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';//'https://github.com/ANDRESHZ/formDataset/raw/main/Formulario%20Recoleccion/DatosBasicos/Consentimiento_latex.pdf'//'Consentimiento_latex.pdf'//'https://pdf-lib.js.org/assets/with_update_sections.pdf'
  // const existingPdfBytes2 = await fetch(url).then(res => res.arrayBuffer());
  //create file with base64 string content
  // var save = arrayBufferToBase64(existingPdfBytes2);
  // var blob = new Blob([save], { type: "text/plain;charset=utf-8" });
  // saveAs(blob, "sample-file.txt");
  const existingPdfBytes = base64ToArrayBuffer(ObtainB64());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the font
  const theFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const theFontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);



  // Fetch JPEG image
  const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg';
  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());

  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.14);

  // Get the width and height of the first page
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  // const firstPage = pages[0];
  const { width, height } = pages[0].getSize();
  const tamL = 12;
  const colorL = rgb(0.05, 0.05, 0.05);
  console.log(`ancho: ${width} largo: ${height}`)
  pages[0].drawText(formatDate(thisMonth), { x: 60, y: height - 135, size: tamL, font: theFont, color: colorL, });
  pages[0].drawText(datafrom.get('name'), { x: 138, y: height - 249, size: tamL, font: theFont, color: colorL, });
  pages[2].drawText('SI', { x: 63, y: height - 330, size: tamL+6, font: theFontBold, color: colorL, });
  pages[2].drawText('SI', { x: 63, y: height - 349.2, size: tamL+6, font: theFontBold, color: colorL, });
  pages[2].drawText('SI', { x: 63, y: height - 368.3, size: tamL+6, font: theFontBold, color: colorL, });
  pages[2].drawText(datafrom.get('name').toUpperCase(), { x: 125, y: height - 493, size: tamL, font: theFontBold, color: colorL, });
  pages[2].drawText(formatDate(thisMonth), { x: 453, y: height - 450, size: tamL, font: theFont, color: colorL, });
  // Add a blank page to the document
  pages[2].drawImage(jpgImage, {
    x: 150,//pages[0].getWidth() / 2 - jpgDims.width / 2,
    y: height - 450,//,pages[0].getHeight() / 2 - jpgDims.height / 2,
    width: jpgDims.width,
    height: jpgDims.height,
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  download(pdfBytes, "consentimientoeditado V1.pdf", "application/pdf");
  // window.location.href="FaceDetec.html";
}