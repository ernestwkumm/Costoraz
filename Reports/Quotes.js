function generatePDF() {
  const element = document.getElementById("quoteTemplate");
  console.log("testing...1");
  console.log("testing...2");

  var opt = {
    margin: 0.1,
    filename: "Quote123456.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
  };

  console.log(opt.filename);

  html2pdf().set(opt).from(element).save();
}
