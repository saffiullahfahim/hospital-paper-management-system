import { login } from "../../modules/login.js";
import { userPage } from "../../modules/userPage.js";
import { documentPage } from "../../modules/documentPage.js";
import { inboxPage } from "../../modules/inboxPage.js";
import { historyPage } from "../../modules/historyPage.js";

const adminGAS =
  "https://script.google.com/macros/s/AKfycbwGxEujY7EKh3xgV6V0XNLxQlcqW7L-dXKEK_m_/exec";

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

  forgetPasswordLoad();

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
      if (e.data) {
        $password =
          $password.substr(0, e.target.selectionStart - 1) +
          e.data +
          $password.substr(e.target.selectionStart - 1);
      } else {
        $password =
          $password.substr(0, e.target.selectionStart) +
          $password.substr(
            e.target.selectionStart + ($password.length - e.target.value.length)
          );
      }

      let start = e.target.selectionStart;
      let value = e.target.value;
      let result = "";
      for (let i of value) {
        result += "•";
      }
      e.target.value = result;
      setCaretPosition(e.target, start);
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
  document.forms["admin-login-form"].onsubmit = (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.innerText = "Please Wait..";
    document.querySelector("#login-error").style.display = "none";
    d.post(adminGAS, {
      type: 0,
      data: JSON.stringify({
        userName: username.value.trim(),
        password: $password,
      }),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, backup } = res;
      if (result) {
        document.querySelector("#body").innerHTML = userPage;
        document.querySelector("#backupEmail").value = backup ? backup : "";
        addUserLoad(data);
        window.d.messege = messege;
        window.d.backup = backup;
      } else {
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
  };
};

const forgetPasswordLoad = () => {
  let forgetBtn = document.querySelector("#forgetPassWord");
  let loading = document.querySelector("#loading");

  forgetBtn.onclick = () => {
    loading.style.display = "block";

    d.post(adminGAS, {
      type: 14,
      data: JSON.stringify({}),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        loading.style.display = "none";
        $("#sentEmailModal").modal("show");
      }
    });
  };
};

const showUserData = (data, type = "") => {
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[5];
    idList.push({ id: id, database: x[4] });
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)} days</td>
  		<td>${x[3] != "x" ? x[3].substr(1).replace(/,/g, "<br>") : "-"}</td>
      <td style="min-width: 50px;">
  		  <button id="inbox-${id}" class="tb-btn delete">
					<span class="icon"><img style="max-width: 80%;" src="asset/img/mail.png" alt="Inbox"/></span>
				</button>
      </td>
      <td style="min-width: 50px;">
  		  <button id="history-${id}" class="tb-btn delete">
					<span class="icon"><img style="max-width: 80%;" src="asset/img/share-clock.png" alt="History"/></span>
				</button>
      </td>
      <td style="min-width: 50px;">
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button>
      </td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
		<th>Email</th>
		<th>Password</th>
		<th>History</th>
		<th>IP Address</th>
		<th style="min-width: 100px;"></th>
    <th style="min-width: 100px;"></th>
    <th style="min-width: 100px;"></th>
	</tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x.id}`);
    let inbox = document.querySelector(`#inbox-${x.id}`);
    let history = document.querySelector(`#history-${x.id}`);
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(adminGAS, {
        type: 4,
        data: JSON.stringify({
          id: x.id,
          database: window.d.messege,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showUserData(res.data);
      userSearchLoad(res.data);
      document.querySelector("#search").value = "";
    };

    inbox.onclick = async () => {
      inboxLoad(x.database.substr(1));
    };

    history.onclick = async () => {
      historyLoad(x.database.substr(1));
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showUserData);
};

const userSearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][0].indexOf(search.value) > -1) {
        data[i].push(i + 1);
        finalData.push(data[i]);
      }
    }
    showUserData(finalData, 1);
  };
};

const backupFormLoad = () => {
  let backup = document.querySelector("#backupEmail");
  let button = document.querySelector("#backupBtn");
  let error = document.querySelector("#backup-error");
  let success = document.querySelector("#backup-success");

  document.forms["backupForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Processing..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";
    window.d.backup = backup.value.trim();
    d.post(adminGAS, {
      type: 13,
      data: JSON.stringify({
        email: backup.value.trim(),
        database: window.d.messege,
      }),
    })
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result } = res;
        if (result) {
          button.innerText = "Backup";
          success.innerText = "Successfully set up backup email!";
          success.style.display = "block";
          loading.style.display = "none";
        } else {
          button.innerText = "Backup";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Backup";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

const changePasswordLoad = () => {
  let oldPass = document.querySelector("#oldPass");
  let newPass = document.querySelector("#newPass");
  let conNewPass = document.querySelector("#conNewPass");
  let button = document.querySelector("#changePasswordBtn");
  let error = document.querySelector("#changePassword-error");
  let success = document.querySelector("#changePassword-success");

  let $oldPass = "";
  oldPass.oninput = (e) => {
    let $password = $oldPass;
    if (e.data) {
      $password =
        $password.substr(0, e.target.selectionStart - 1) +
        e.data +
        $password.substr(e.target.selectionStart - 1);
    } else {
      $password =
        $password.substr(0, e.target.selectionStart) +
        $password.substr(
          e.target.selectionStart + ($password.length - e.target.value.length)
        );
    }

    let start = e.target.selectionStart;
    let value = e.target.value;
    let result = "";
    for (let i of value) {
      result += "•";
    }
    e.target.value = result;
    setCaretPosition(e.target, start);
    $oldPass = $password;
  };

  let $newPass = "";
  newPass.oninput = (e) => {
    let $password = $newPass;
    if (e.data) {
      $password =
        $password.substr(0, e.target.selectionStart - 1) +
        e.data +
        $password.substr(e.target.selectionStart - 1);
    } else {
      $password =
        $password.substr(0, e.target.selectionStart) +
        $password.substr(
          e.target.selectionStart + ($password.length - e.target.value.length)
        );
    }

    let start = e.target.selectionStart;
    let value = e.target.value;
    let result = "";
    for (let i of value) {
      result += "•";
    }
    e.target.value = result;
    setCaretPosition(e.target, start);
    $newPass = $password;
  };

  let $conNewPass = "";
  conNewPass.oninput = (e) => {
    let $password = $conNewPass;
    if (e.data) {
      $password =
        $password.substr(0, e.target.selectionStart - 1) +
        e.data +
        $password.substr(e.target.selectionStart - 1);
    } else {
      $password =
        $password.substr(0, e.target.selectionStart) +
        $password.substr(
          e.target.selectionStart + ($password.length - e.target.value.length)
        );
    }

    let start = e.target.selectionStart;
    let value = e.target.value;
    let result = "";
    for (let i of value) {
      result += "•";
    }
    e.target.value = result;
    setCaretPosition(e.target, start);
    $conNewPass = $password;
  };

  document.forms["changePasswordForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Changing..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    if ($newPass !== $conNewPass) {
      button.innerText = "Change";
      error.innerText = "Confirm password doesn't match.";
      error.style.display = "block";
      loading.style.display = "none";
      return;
    }
    d.post(adminGAS, {
      type: 5,
      data: JSON.stringify({
        oldPass: $oldPass,
        newPass: $newPass,
        database: window.d.messege,
      }),
    })
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, messege } = res;
        if (result) {
          if (messege == "success") {
            button.innerText = "Change";
            success.innerText = "Successfully changed password!";
            success.style.display = "block";
            loading.style.display = "none";
          } else {
            button.innerText = "Change";
            error.innerHTML = "Old Password is't correct";
            error.style.display = "block";
            loading.style.display = "none";
          }
        } else {
          button.innerText = "Change";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Change";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

const addUserLoad = (data) => {
  showUserData(data);
  userSearchLoad(data);
  backupFormLoad();
  changePasswordLoad();
  documentsLoad();
  logoutLoad();
  let email = document.querySelector("#addUserEmail");
  let password = document.querySelector("#addUserPass");
  let history = document.querySelector("#addUserHistory");
  let ip = document.querySelector("#addUserIp");
  let button = document.querySelector("#addUserBtn");
  let error = document.querySelector("#adduser-error");
  let success = document.querySelector("#adduser-success");
  let loading = document.querySelector("#loading");

  document.forms["userAddForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Adding..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    let ipValue = ip.value.replace(/\n/g, ",");
    if (ipValue.slice(-1) == ",") {
      ipValue = ipValue.slice(0, -1);
    }
    d.post(adminGAS, {
      type: 2,
      data: JSON.stringify({
        date: "",
        email: email.value.trim(),
        pass: password.value,
        history: history.value,
        ip: ipValue,
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, messege, data } = res;
        if (result) {
          if (messege != "success") {
            button.innerText = "Add";
            error.innerHTML = "User already exist!";
            error.style.display = "block";
            loading.style.display = "none";
          } else {
            showUserData(data);
            userSearchLoad(data);
            e.target.reset();
            button.innerText = "Add";
            success.innerText = "Successfully added new user!";
            success.style.display = "block";
            loading.style.display = "none";
          }
        } else {
          console.log(res);
          button.innerText = "Add";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Add";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

const usersLoad = () => {
  let button = document.querySelector("#users");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = userPage;
    d.post(adminGAS, {
      type: 1,
      data: JSON.stringify({
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          addUserLoad(data);
          document.querySelector("#backupEmail").value = window.d.backup
            ? window.d.backup
            : "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const documentSearchLoad = (data) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][1].toLowerCase().indexOf(search.value.toLowerCase()) > -1) {
        data[i].push(i + 1);
        finalData.push(data[i]);
      }
    }
    showDocumentData(finalData, 1);
  };
};

const documentsLoad = () => {
  let button = document.querySelector("#documents");
  button.onclick = () => {
    document.querySelector("#body").innerHTML = documentPage;
    d.post(adminGAS, {
      type: 6,
      data: JSON.stringify({
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          addDocumentLoad(data);
          document.querySelector("#backupEmail").value = window.d.backup
            ? window.d.backup
            : "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const dateCovert = (date) => {
  date = new Date(date);
  return (
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    "-" +
    date.getFullYear()
  );
};

const showDocumentData = (data, type = "") => {
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
  		<td>${dateCovert(x[0].substr(1))}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>
	    	<button data-toggle="modal" data-target="#iframe${index}" class="tb-btn delete">
			    <span class="icon" style="margin-right: 20px;"><img src="asset/img/view.svg" alt="Trash"/></span>
				</button>
  		</td>
  		<td>
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button>
			</td>
  	</tr>
    `;
    result2 += `
    <div class="modal fade custom-modal show" id="iframe${index}" tabindex="-1" role="dialog" aria-modal="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" style="
    min-width: 600px;
    width: 100%;
    max-width: 800px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>

				<div style="padding: 0 50px;" class="modal-body">
					

					<iframe style="min-height: 75vh; margin-bottom: 50px; width: 100%; border: none;" src="./pdf.js/web/viewer.html?fileId=${x[2].substr(
            1
          )}" class="custom-form-sec">
					
					</iframe><!-- custom-form-sec -->

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
		<th>Issue Date</th>
		<th>Document Name</th>
		<th></th>
		<th></th>
	</tr>
	${result}
  `;
  table.style.display = "table";
  let div;
  if (document.querySelector("#iframeDiv")) {
    div = document.querySelector("#iframeDiv");
    div.innerHTML = result2;
  } else {
    div = document.createElement("div");
    div.setAttribute("id", "iframeDiv");
    div.innerHTML = result2;
    document.querySelector("#body").appendChild(div);
  }

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x}`);

    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(adminGAS, {
        type: 9,
        data: JSON.stringify({
          id: x,
          database: window.d.messege,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showDocumentData(res.data);
      documentSearchLoad(res.data);
      document.querySelector("#search").value = "";
    };
  }
  loading.style.display = "none";
  sortingLoad(1, data, type, showDocumentData);
};

const addDocumentLoad = (data) => {
  showDocumentData(data);
  documentSearchLoad(data);
  backupFormLoad();
  changePasswordLoad();
  usersLoad();
  logoutLoad();
  let docName = document.querySelector("#addDocumentName");
  let file = document.querySelector("#addDocumentFile");
  let button = document.querySelector("#addDocumentBtn");
  let error = document.querySelector("#addDocument-error");
  let success = document.querySelector("#addDocument-success");
  let loading = document.querySelector("#loading");

  let errorModalMessege = document.querySelector("#modal-error");

  document.forms["documentAddForm"].onsubmit = async (e) => {
    e.preventDefault();
    button.innerText = "Adding..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    if (file.files[0].type != "application/pdf") {
      button.innerText = "Add";
      error.innerHTML = "Only PDF files may be uploaded.";
      error.style.display = "block";
      loading.style.display = "none";
      return;
    }
    let fileData64 = await d.readFiles(file.files[0]);
    fileData64 = fileData64[0];

    // pdf js
    const pdfjsLib = window["pdfjs-dist/build/pdf"];

    pdfjsLib.GlobalWorkerOptions.workerSrc = "../../pdf.js/build/pdf.worker.js";

    let err = [];

    let pdf = await pdfjsLib.getDocument(fileData64).promise;
    let pagesNum = pdf.numPages;
    let fields = await pdf.getFieldObjects();
    console.log(fields);

    if (fields?.Name == undefined) {
      err.push("Name");
    }

    if (fields?.Date == undefined) {
      err.push("Date");
    }

    let sign = false;
    for (let x = 1; x <= pagesNum; x++) {
      if (sign) break;
      let page = await pdf.getPage(x);
      let content = await page.getTextContent();

      for (let _x of content.items) {
        let { str } = _x;
        if (str == "Signature:") {
          sign = true;
          break;
        }
      }
    }

    if (!sign) {
      err.push("Signature");
    }

    if (err.length) {
      errorModalMessege.innerText = err.join(", ") + " Not Found.";
      loading.style.display = "none";
      button.innerText = "Add";
      $("#addNewDocumentModal").modal("hide");
      $("#errorModal").modal("show");
      return;
    }

    d.post(adminGAS, {
      type: 7,
      data: JSON.stringify({
        date: "",
        fileName: docName.value,
        file: fileData64,
        database: window.d.messege,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          showDocumentData(data);
          documentSearchLoad(data);
          e.target.reset();
          button.innerText = "Add";
          success.innerText = "Successfully added new document!";
          success.style.display = "block";
          loading.style.display = "none";
        } else {
          console.log(res);
          button.innerText = "Add";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Add";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

const downloadFile = async (id, fileName) => {
  let loading = document.querySelector("#loading");
  loading.style.display = "block";

  let data = JSON.parse(
    JSON.parse(
      await d.post(adminGAS, {
        type: 15,
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

//inbox load

const inboxLoad = (database) => {
  document.querySelector("#body").innerHTML = inboxPage;
  d.post(adminGAS, {
    type: 10,
    data: JSON.stringify({
      database: database,
    }),
  })
    .then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        addInboxLoad(res);
        document.querySelector("#backupEmail").value = window.d.backup
          ? window.d.backup
          : "";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addInboxLoad = (res) => {
  showInboxData(res);
  inboxSearchLoad(res);
  backupFormLoad();
  changePasswordLoad();
  usersLoad();
  documentsLoad();
  logoutLoad();

  let button = document.querySelector("#history");

  button.onclick = () => {
    historyLoad(res.database);
  };
};

const showInboxData = ({ user, data, database }, type = "") => {
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[5];
    idList.push(id);
    result += `
    <tr>
      <td>${x[0].substr(1)}</td>
      <td>${x[1].substr(1)}</td>
      <td>${x[2].substr(1)}</td>
      <td>${x[3].substr(1)}</td>
      <td>
        <button style="background: none; border: none;" onclick="downloadFile('${x[4].substr(
          1
        )}', '${x[0].substr(1)}')" class="icon-btn download">
          <span class="icon">
            <img src="./asset/img/download.png" alt="Download"/>
          </span>
        </button>
      </td>
  		<td>
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button>
			</td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <caption style="text-align: center;display: table-caption;font-weight: 600; font-size: 18px;caption-side:top; color: #000; margin-bottom: 10px; ">${user}</caption>
  <tr>
    <th>Name</th>
	  <th>Date of Birth</th>
	  <th>Email</th>
		<th>Document</th>
		<th>Download</th>
    <th></th>
	</tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x}`);
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(adminGAS, {
        type: 11,
        data: JSON.stringify({
          id: x,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showInboxData(res);
      inboxSearchLoad(res);
      document.querySelector("#search").value = "";
    };
  }

  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showInboxData);
};

const inboxSearchLoad = (res) => {
  let { data } = res;
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
        data[i].push(i + 1);
        finalData.push(data[i]);
      }
    }
    res.data = finalData;
    showInboxData(res, 1);
  };
};

const historyLoad = (database) => {
  document.querySelector("#body").innerHTML = historyPage;
  d.post(adminGAS, {
    type: 16,
    data: JSON.stringify({
      database: database,
    }),
  })
    .then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result } = res;
      if (result) {
        addHistoryLoad(res);
        document.querySelector("#backupEmail").value = window.d.backup
          ? window.d.backup
          : "";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addHistoryLoad = (res) => {
  showHistoryData(res);
  historySearchLoad(res);
  backupFormLoad();
  changePasswordLoad();
  usersLoad();
  documentsLoad();
  logoutLoad();

  let button = document.querySelector("#inbox");

  button.onclick = () => {
    inboxLoad(res.database);
  };
};

const showHistoryData = ({ user, data, database }, type = "") => {
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let result2 = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[5];
    idList.push(id);
    result += `
    <tr>
      <td>${x[0].substr(1)}</td>
      <td>${x[1].substr(1)}</td>
      <td>${x[2].substr(1)}</td>
      <td>${x[3].substr(1)}</td>
      <td>
	    	<button data-toggle="modal" data-target="#iframe${index}" class="tb-btn delete">
			    <span class="icon" style="margin-right: 20px;"><img src="asset/img/view.svg" alt="Trash"/></span>
				</button>
  		</td>
  		<td>
  		  <button id="delete-${id}" class="tb-btn delete">
					<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
				</button>
			</td>
  	</tr>
    `;

    result2 += `
      <div class="modal fade custom-modal show" id="iframe${index}" tabindex="-1" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" style="
      min-width: 600px;
      width: 100%;
      max-width: 800px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div style="padding: 0 50px;" class="modal-body">
            

            <iframe style="min-height: 75vh; margin-bottom: 50px; width: 100%; border: none;" src="./pdf.js/web/viewer.html?fileId=${x[4].substr(
              1
            )}" class="custom-form-sec">
            
            </iframe><!-- custom-form-sec -->

          </div><!-- modal-body -->
        </div>
      </div>
    </div>
    `;
    index++;
  }

  table.innerHTML = `
  <caption style="text-align: center;display: table-caption;font-weight: 600; font-size: 18px;caption-side:top; color: #000; margin-bottom: 10px; ">${user}</caption>
  <tr>
    <th>Name</th>
	  <th>Date of Birth</th>
	  <th>Email</th>
		<th>Document</th>
		<th></th>
    <th></th>
	</tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x}`);
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await d.post(adminGAS, {
        type: 17,
        data: JSON.stringify({
          id: x,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showHistoryData(res);
      historySearchLoad(res);
      document.querySelector("#search").value = "";
    };
  }

  let div;
  if (document.querySelector("#iframeDiv")) {
    div = document.querySelector("#iframeDiv");
    div.innerHTML = result2;
  } else {
    div = document.createElement("div");
    div.setAttribute("id", "iframeDiv");
    div.innerHTML = result2;
    document.querySelector("#body").appendChild(div);
  }

  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showHistoryData);
};

const historySearchLoad = (res) => {
  let { data } = res;
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
        data[i].push(i + 1);
        finalData.push(data[i]);
      }
    }
    res.data = finalData;
    showHistoryData(res, 1);
  };
};

const sortingLoad = (index, data, type, callback) => {
  let sortingBtn = document.querySelector("#sortingBtn");
  let loading = document.querySelector("#loading");
  sortingBtn.onclick = () => {
    if (data.length) {
      loading.style.display = "block";

      let data1 = data[0][index];
      if (type == "") {
        data.forEach((v, i) => {
          data[i].push(i + 1);
        });
        type = 1;
      }

      data = data.sort((a, b) => {
        let x = a[index].substr(1).toLowerCase();
        let y = b[index].substr(1).toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

      if (data[0][index] === data1) {
        data = data.reverse();
      }
      //console.log(data);
      callback(data, type);
    }
  };
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
