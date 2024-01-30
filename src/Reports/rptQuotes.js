function generatePDF() {
  console.log("testing...1");
  console.log("testing...2");

  const element = document.getElementById("quoteTemplate");
  // const element = FileSystemDirectoryEntry.getElementById("quoteTemplate");

  var opt = {
    margin: 0.0,
    filename: "Quote123456.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 6 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  console.log(opt.filename);

  html2pdf().set(opt).from(element).save();
}
