import { login } from "../../modules/login.js";
import { page } from "../../modules/page.js";
import { emailPage } from "../../modules/email.js";

const userGAS =
  "https://script.google.com/macros/s/AKfycbzLEX8OFSld2y-zSNGCw5oyqVWbqfoKO1kKrJ5n0cHJElKaNIQY0QnAQnLeGrR2eHzD/exec";

const setCaretPosition = (e, pos) => {
  // Modern browsers
  if (e.setSelectionRange) {
    e.focus();
    e.setSelectionRange(pos, pos);

    // IE8 and below
  } else if (e.createTextRange) {
    var range = e.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
};

const loginLoad = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let loginBtn = document.querySelector("#loginBtn");

  let $password = "";
  let $prePass = "";

  password.onpaste = (e) => {
    $prePass = e.target.value;
  };

  password.onundo = (e) => {
    e.preventDefault();
  };
  password.oninput = (e) => {
    if (e.inputType == "historyUndo") return;
    if (e.inputType == "insertText" || e.inputType == "insertCompositionText") {
      e.target.value = e.target.value.slice(0, -1 * e.data.length);
      return;
    }
    if (e.target.value.length != e.target.selectionStart) {
      $prePass = $prePass.slice(
        0,
        $prePass.length - e.target.value.length + e.target.selectionStart
      );
      $prePass = e.target.value
        .slice(0, -e.target.value.length + e.target.selectionStart)
        .substr($prePass.length);
    } else if (e.inputType == "insertFromPaste") {
      $prePass = e.target.value.substr($prePass.length);
    }

    if ($prePass) {
      $password =
        $password.substr(0, e.target.selectionStart - $prePass.length) +
        $prePass +
        $password.substr(e.target.selectionStart - $prePass.length);
    } else {
      $password =
        $password.substr(0, e.target.selectionStart) +
        $password.substr(
          e.target.selectionStart + ($password.length - e.target.value.length)
        );
    }

    $prePass = "";
    let start = e.target.selectionStart;
    let value = e.target.value;
    let result = "";
    for (let i of value) {
      result += "•";
    }
    e.target.value = result;
    setCaretPosition(e.target, start);
  };

  document.forms["admin-login-form"].onsubmit = async (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.innerText = "Please Wait..";
    document.querySelector("#login-error").style.display = "none";
    let ipAddress = "";
    try {
      ipAddress = await d.get("https://ifconfig.me/ip");
    } catch (err) {
      document.querySelector("#login-error").innerText =
        "Please deactivate adblock and reload again.";
      document.querySelector("#login-error").style.display = "block";
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
      return;
    }
    d.post(userGAS, {
      type: 0,
      data: JSON.stringify({
        userName: username.value.trim(),
        password: $password,
        ip: ipAddress,
      }),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, history } = res;
      if (result && messege != "ip") {
        document.querySelector("#body").innerHTML = page;
        loadAll();
        showDocumentData(data);
        documentSearchLoad(data);
        logoutLoad();
        window.d.messege = messege;
        window.d.history = history;
      } else if (result && messege == "ip") {
        document.querySelector("#login-error").innerText =
          "Unauthorized Access. Contact System Administrator.";
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      } else {
        document.querySelector("#login-error").innerText =
          "Wrong username and/or password. Please try again.";
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
  };
};

// documents
const documentSearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1) {
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showDocumentData(finalData, 1);
  };
};

const documentsLoad = () => {
  let button = document.querySelector("#home");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(userGAS, {
      type: 1,
      data: JSON.stringify({
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          loadAll();
          showDocumentData(data);
          documentSearchLoad(data);
          logoutLoad();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const convertDataURIToBinary = (dataURI) => {
  var raw = window.atob(dataURI);
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
  let List = document.querySelectorAll("#viewerContainer input[name='Name']");
  for (let x of List) {
    x.setAttribute("oninput", "inputPrevent(event)");
    x.setAttribute("autocomplete", "off");
    x.setAttribute("required", "");
  }
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

const emailFormLoad = (docName) => {
  let form = document.forms["emailSendForm"];
  //let client = document.querySelector("#emailSendName");
  let email = document.querySelector("#emailSendEmail");
  let date = document.querySelector("#emailSendDate");
  let button = document.querySelector("#emailSendBtn");
  let error = document.querySelector("#error");
  let loading = document.querySelector("#loading");

  form.onsubmit = async (e) => {
    e.preventDefault();
    let client = document.querySelector("#viewerContainer input[name='Name']");

    error.style.display = "none";
    loading.style.display = "block";
    button.innerText = "Sending..";

    const data = await PDFViewerApplication.pdfDocument.saveDocument();
    let result = await uint8ArrayToBase64(data);

    d.post(userGAS, {
      type: 2,
      data: JSON.stringify({
        time: "",
        docName: docName,
        email: email.value,
        date: date.value,
        name: client.value,
        file: result,
        id: "",
        database: window.d.messege,
      }),
    })
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result } = res;
        if (result) {
          e.target.reset();
          button.innerText = "Send";
          loading.style.display = "none";
          $("#sentEmailModal").modal("show");
        } else {
          console.log(res);
          error.style.display = "block";
          button.innerText = "Send";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        error.style.display = "block";
        button.innerText = "Send";
        loading.style.display = "none";
      });
  };
};

const emailShow = async (fileName, fileId) => {
  document.querySelector("#body").innerHTML = emailPage;
  emailFormLoad(fileName);
  loadAll();
  logoutLoad();
  let { messege } = JSON.parse(
    await d.post(userGAS, {
      type: 6,
      data: JSON.stringify({
        id: fileId,
      }),
    })
  );

  let { data } = JSON.parse(messege);

  let d_ = convertDataURIToBinary(data);
  delete window.localStorage["pdfjs.history"];
  webViewerLoad();
  await PDFViewerApplication.open(d_);
  newRender();
};

window.emailShow = emailShow;

const showDocumentData = (data, type = "") => {
  document.querySelector("#home a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td onclick="emailShow('${x[0].substr(1)}', '${x[1].substr(
      1
    )}')" style="cursor: pointer;">${x[0].substr(1)}</td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
};

// inbox
const inboxSearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][2].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][3].toLowerCase().indexOf(search.value.toLowerCase()) > -1
      ) {
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showInboxData(finalData, 1);
  };
};

const inboxLoad = () => {
  let button = document.querySelector("#inbox");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(userGAS, {
      type: 3,
      data: JSON.stringify({
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          loadAll();
          showInboxData(data);
          inboxSearchLoad(data);
          logoutLoad();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const downloadFile = async (id, fileName) => {
  let loading = document.querySelector("#loading");
  loading.style.display = "block";

  let data = JSON.parse(
    JSON.parse(
      await d.post(userGAS, {
        type: 6,
        data: JSON.stringify({
          id: id,
        }),
      })
    ).messege
  ).data;
  const anchor = document.createElement("a");
  if ("download" in anchor) {
    //html5 A[download]
    anchor.href = "data:application/pdf;base64," + data;
    anchor.setAttribute("download", fileName);
    anchor.innerHTML = "downloading...";
    anchor.style.display = "none";
    anchor.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    document.body.appendChild(anchor);
    setTimeout(function () {
      anchor.click();
      document.body.removeChild(anchor);
      loading.style.display = "none";
    }, 66);
  }
};

window.downloadFile = downloadFile;

const showInboxData = (data, type = "") => {
  document.querySelector("#inbox a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)}</td>
  		<td>${x[3].substr(1)}</td>
  		<td>
  		  <button onclick="downloadFile('${x[4].substr(1)}', '${x[0].substr(
      1
    )}')" class="icon-btn download">
					<span class="icon">
						<img src="./asset/img/download.png" alt="Download"/ class="iconBlack"/>
						<img src="./asset/img/download-white.png" alt="Download"/ class="iconBlue">
					</span>
			  </button>
  		<td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
    <th>Name</th>
	  <th>Date of Birth</th>
	  <th>Email</th>
		<th>Document</th>
		<th>Download</th>
	</tr>
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
};

// history
const historySearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i][0].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][2].toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
        data[i][3].toLowerCase().indexOf(search.value.toLowerCase()) > -1
      ) {
        data[i].push(i);
        finalData.push(data[i]);
      }
    }
    showHistoryData(finalData, 1);
  };
};

const historyLoad = () => {
  let button = document.querySelector("#history");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = page;
    d.post(userGAS, {
      type: 5,
      data: JSON.stringify({
        database: window.d.messege,
        history: window.d.history,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          loadAll();
          showHistoryData(data);
          historySearchLoad(data);
          logoutLoad();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const showHistoryData = (data, type = "") => {
  document.querySelector("#history a").classList.add("active");
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[3];
    idList.push(id);
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)}</td>
  		<td>${x[3].substr(1)}</td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
    <tr>
      <th>Name</th>
			<th>Date of Birth</th>
			<th>Email</th>
			<th>Document</th>
		</tr>
	${result}
  `;
  table.style.display = "table";
  loading.style.display = "none";
};

const loadAll = () => {
  documentsLoad();
  inboxLoad();
  historyLoad();
};
const logoutLoad = () => {
  let button = document.querySelector("#logout");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = login;
    loginLoad();
  };
};

document.querySelector("#body").innerHTML = login;
loginLoad();
