import { verify } from "../../modules/verify.js";
import { $document } from "../../modules/document.js";

const clientGAS =
  "https://script.google.com/macros/s/AKfycbznltoxSIt9n-SCawxtdZL5ksbTtV4fUOU8BulOhNxPBorvilBAEmRmotdgHC_cKCk0/exec";

let { PDFDocument, StandardFonts, rgb } = PDFLib;

function GetURLParameter(parameter) {
  let data = [];
  let url = window.location.toString();
  if (url.indexOf("?") >= 0) {
    url = url.substr(url.indexOf("?"));
    let searchParams = new URLSearchParams(url);
    if (searchParams.has(parameter)) {
      data = searchParams.getAll(parameter);
    }
  }
  if (!data.length) data = "";
  else data = data[0];
  return data;
}

const verifyLoad = () => {
  let loading = document.querySelector("#loading");
  let form = document.forms["form"];
  let button = document.querySelector("#button");
  let error = document.querySelector("#error");

  form.onsubmit = (e) => {
    e.preventDefault();
    loading.style.display = "block";
    error.style.display = "none";
    button.innerText = "Processing..";

    const select = document.querySelectorAll("select");
    let fullDate = [];
    for (let x of select) {
      let value = x.value;
      if (value.length < 2) {
        value = value.padStart(2, "0");
      }
      fullDate.push(value);
    }

    d.post(clientGAS, {
      type: 0,
      data: JSON.stringify({
        date: fullDate.join("-"),
        id: GetURLParameter("i"),
        b: GetURLParameter("b"),
      }),
    })
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, messege } = res;
        if (result) {
          if (messege == "id") {
            error.style.display = "block";
            button.innerText = "Submit";
            error.innerHTML = "Invalid Link";
            loading.style.display = "none";
          } else if (messege == "link") {
            error.style.display = "block";
            button.innerText = "Submit";
            error.innerHTML = "This link has been expired";
            loading.style.display = "none";
          } else if (messege == "date") {
            error.style.display = "block";
            button.innerText = "Submit";
            error.innerHTML = "Please enter correct Date of Birth";
            loading.style.display = "none";
          } else if (messege == "used") {
            error.style.display = "block";
            button.innerText = "Submit";
            error.innerHTML = "Signeture already submitted!";
            loading.style.display = "none";
          } else if (messege == "verify") {
            error.style.display = "block";
            button.innerText = "Submit";
            error.innerHTML = "Date of birth already verified!";
            loading.style.display = "none";
          } else {
            //e.target.reset();
            button.innerText = "Submit";
            loading.style.display = "none";
            $("#verifiedDobModal").modal({
              backdrop: "static",
            });
          }
        }
      })
      .catch((err) => {
        error.style.display = "block";
        button.innerText = "Submit";
        error.innerHTML = "Error found! Please try again.";
        loading.style.display = "none";
      });
  };
};

const seeMessegeRequest = () => {
  let loading = document.querySelector("#loading");
  let $close = document.querySelector("#error-Close");
  let error = document.querySelector("#error");

  d.post(clientGAS, {
    type: 1,
    data: JSON.stringify({
      id: GetURLParameter("d"),
      b: GetURLParameter("b"),
    }),
  })
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        loading.style.display = "none";
        $close.style.display = "none";
        if (messege == "id") {
          error.innerText = "Invalid Link.";
          $("#errorModal").modal({
            backdrop: "static",
          });
        } else if (messege == "link") {
          error.innerText = "This link has been expired";
          $("#errorModal").modal({
            backdrop: "static",
          });
        } else if (messege == "used") {
          error.innerText = "Signeture already submitted.";
          $("#errorModal").modal({
            backdrop: "static",
          });
        } else if (messege == "verify") {
          error.innerText = "Date of birth isn't verify yet.";
          $("#errorModal").modal({
            backdrop: "static",
          });
        } else {
          loading.style.display = "block";
          $close.style.display = "";
          seeMessege(messege.substr(1));
        }
      }
    })
    .catch((err) => {
      loading.style.display = "none";
      $close.style.display = "none";
      error.innerText = "Please try again.";
      $("#errorModal").modal({
        backdrop: "static",
      });
    });
};

const convertDataURIToBinary = async (fileId, type = "") => {
  let dataURI;
  if (type == "") {
    let { data } = JSON.parse(
      JSON.parse(
        await d.post(clientGAS, {
          type: 3,
          data: JSON.stringify({
            id: fileId,
          }),
        })
      ).messege
    );

    dataURI = "pdf," + data;
  } else dataURI = fileId;
  //console.log(dataURI);
  var raw = window.atob(dataURI.split(",")[1]);
  var rawLength = raw.length;

  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i) & 0xff;
  }
  return array;
};

const newRender = (type = "") => {
  if (PDFViewerApplication.documentInfo !== null) {
    rendered(type);
    return;
  }
  setTimeout(() => {
    newRender(type);
  }, 1000);
};

const inputPrevent = (e) => {
  if (e.inputType == "insertText" || e.inputType == "insertCompositionText") {
    e.target.value = e.target.value.slice(0, -1 * e.data.length);
  }
};

window.inputPrevent = inputPrevent;

const rendered = (type = "") => {
  let List = document.querySelectorAll("#viewerContainer input");
  for (let x of List) {
    x.style.background = "#fff";
    x.style.border = "none";
    //x.style.font = "600 8px 'Raleway', sans-serif !important";
    x.disabled = true;
  }
  if (document.querySelector(".page"))
    document.querySelector("#viewerDiv").style.height =
      Number(
        window
          .getComputedStyle(document.querySelector(".page"))
          ["height"].slice(0, -2)
      ) +
      40 +
      "px";
  if (List.length == 0) {
    setTimeout(function () {
      rendered(type);
    }, 1000);
    return;
  }
  if (type == "") {
    document.getElementById("loading").style.display = "none";
  }
};

PDFViewerApplication.rendered = rendered;

const uint8ArrayToBase64 = async (data) => {
  const base64url = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([data]));
  });
  return base64url;
};

const signShow = () => {
  const canvas = document.querySelector("#signCanvas");
  const signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 1,
    penColor: "rgb(21, 21, 21)",
  });
  window.signaturePad = signaturePad;

  if (window.innerWidth >= 576) {
    canvas.width = 500 - 62;
  } else {
    canvas.width = window.innerWidth - 62 - 25;
  }
  $("#signatureModal").modal("show");
  window.onresize = () => {
    console.log(123);
    if (window.innerWidth >= 576) {
      canvas.width = 500 - 62;
    } else {
      canvas.width = window.innerWidth - 62 - 25;
    }
  };
};

window.signShow = signShow;

const dateCovert = (date) => {
  date = new Date(date);
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0") +
    "/" +
    date.getFullYear()
  );
};

const signatureSubmit = async (button) => {
  let loading = document.querySelector("#loading");
  let signBtn = document.querySelector("#signBtn");
  let $close = document.querySelector("#error-Close");
  let error = document.querySelector("#error");

  $("#signatureModal").modal("hide");

  if (!window.signaturePad.signature) {
    error.innerText = "Signature Required.";
    $("#errorModal").modal("show");
    return;
  }
  loading.style.display = "block";
  signBtn.style.display = "none";

  const pdfDoc = await PDFDocument.load(window._d);

  const Font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //let dateField1 = false;
  //let dateField2 = false;
  const form = pdfDoc.getForm();
  let fields = form.getFields();
  /*
  for (let i = 0; i < fields.length; i++) {
    let fieldName = fields[i].getName();
    if(fieldName == "data") dateField1 = true;
    if(fieldName == "Date") dateField2 = true;
  }*/

  //if(dateField2){
  const dateField = form.getField("Date");
  dateField.setText(dateCovert(new Date()));
  //}
  const pages = pdfDoc.getPages();

  let ip = await d.get("https://ifconfig.me/ip");
  // ip = "IP Address: " + ip;
  const fontSize = 10;
  const textWidth = Font.widthOfTextAtSize(ip, fontSize);
  const textHeight = Font.heightAtSize(fontSize);

  // signature
  let signData = window.signaturePad.toDataURL("image/png");
  signData = await convertDataURIToBinary(signData, 1);
  const sign = await pdfDoc.embedPng(signData);
  const signDims = sign.scale(0.3);

  for (let i = 0; i < pages.length; i++) {
    let x = pages[0];

    // ip Address append
    const { width: width0, height: height0 } = x.getSize();
    x.drawText(ip, {
      x: width0 - textWidth - 20,
      y: textHeight + 10,
      size: fontSize,
      font: Font,
      color: rgb(211 / 255, 211 / 255, 211 / 255),
    });

    let page = await PDFViewerApplication.pdfDocument.getPage(i + 1);
    let pageContent = await page.getTextContent();

    for (let item = 0; item < pageContent.items.length; item++) {
      let { str, height, width, transform } = pageContent.items[item];
      if (str == "Signature:") {
        let top = height + transform[5] - transform[0] / 2;
        //- transform[2]
        let left = width + transform[4];

        // signature append
        x.drawImage(sign, {
          x: left,
          y: top - signDims.height / 2,
          width: signDims.width,
          height: signDims.height,
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  delete window.localStorage["pdfjs.history"];
  PDFViewerApplication.rendered = () => {
    rendered(1);
  };
  await PDFViewerApplication.open(pdfBytes);
  newRender(1);

  let pdfData = await uint8ArrayToBase64(pdfBytes);
  d.post(clientGAS, {
    type: 2,
    data: JSON.stringify({
      data: pdfData,
      id: GetURLParameter("d"),
      b: GetURLParameter("b"),
    }),
  })
    .then((res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        loading.style.display = "none";
        document.querySelector("#viewerDiv").style.display = "none";
        $("#successModal").modal({
          backdrop: "static",
        });
      } else {
        signBtn.style.display = "";
        loading.style.display = "none";
        //$close.style.display = "none";
        error.innerText = "Please try again.";
        $("#errorModal").modal("show");
      }
    })
    .catch((err) => {
      signBtn.style.display = "";
      loading.style.display = "none";
      //$close.style.display = "none";
      error.innerText = "Please try again.";
      $("#errorModal").modal("show");
    });
};

window.signatureSubmit = signatureSubmit;

const seeMessege = async (fileId) => {
  let loading = document.querySelector("#loading");
  let $close = document.querySelector("#error-Close");
  let error = document.querySelector("#error");

  try {
    let d_ = await convertDataURIToBinary(fileId);
    window._d = d_;
    delete window.localStorage["pdfjs.history"];
    webViewerLoad();
    await PDFViewerApplication.open(d_);
    newRender();
    document.querySelector("#viewerContainer").style.background = "#eee";
  } catch (err) {
    loading.style.display = "none";
    $close.style.display = "none";
    error.innerText = "Please try again.";
    $("#errorModal").modal({
      backdrop: "static",
    });
    console.log(err);
  }
};

if (GetURLParameter("b")) {
  if (GetURLParameter("d")) {
    document.querySelector("#body").innerHTML = $document;
    seeMessegeRequest();
  } else if (GetURLParameter("i")) {
    document.querySelector("#body").innerHTML = verify;
    verifyLoad();
  }
}
