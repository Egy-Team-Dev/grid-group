import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts ={
  Lateef: {
    normal:
      "https://themes.googleusercontent.com/static/fonts/lateef/v2/PAsKCgi1qc7XPwvzo_I-DQ.ttf",
    bold: "https://themes.googleusercontent.com/static/fonts/lateef/v2/PAsKCgi1qc7XPwvzo_I-DQ.ttf",
    italics:
      "https://themes.googleusercontent.com/static/fonts/lateef/v2/PAsKCgi1qc7XPwvzo_I-DQ.ttf",
    bolditalic:
      "https://themes.googleusercontent.com/static/fonts/lateef/v2/PAsKCgi1qc7XPwvzo_I-DQ.ttf",
  },
  // Roboto: {
  //   normal:
  //     "http://themes.googleusercontent.com/static/fonts/opensans/v6/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff",
  //   bold: "http://themes.googleusercontent.com/static/fonts/opensans/v6/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff",
  //   italics:
  //     "http://themes.googleusercontent.com/static/fonts/opensans/v6/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff",
  //   bolditalic:
  //     "http://themes.googleusercontent.com/static/fonts/opensans/v6/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff",
  // },
}
import getDocDefinition from "./docDefinition";

function printDoc(printParams, gridApi, columnApi) {
  console.log("Exporting to PDF...");
 
  const docDefinition = getDocDefinition(printParams, gridApi, columnApi);
  pdfMake.createPdf(docDefinition).download();
}

export default printDoc;
