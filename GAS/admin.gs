const AdminDataBase = "1wCkE1aXpi5jbBcZ4kkP4w7AnoT9ND8ZS-SCbEPb-jNk";
const AdminEmail = "valleyobform@gmail.com";
const AdminInitPass = "12345";

const DocumentDriveFolderId = "1CeU4wYT4XOVHPm1Vonc4AjcGQpPaNWcH";
const UserDriveFolderId = "1a6txPJdMwr0dNomsVMfpgTe73ejnfHRP";
const InboxFolderId = "1M4n1UprfSuK9QC0B4PI_SwR4WpdxYKq8";
const HistoryFolderId = "1OwBMe38e-D8wDMFn5HsIWY13cMWulLMS";

const installApp = () => {
  let ss = SpreadsheetApp.openById(AdminDataBase);
  let loginSheet = ss.getSheetByName("login");
  if (!loginSheet) {
    loginSheet = ss.insertSheet("login");
  }
  loginSheet
    .insertRowBefore(1)
    .getRange("A1:C1")
    .setValues([[AdminEmail, encode(AdminInitPass), AdminDataBase]]);
  Logger.log("Successfully install App. Thank You!");
};

const query = ({ ss, sheetName, range, sql }) => {
  let sqlSheet = ss.getSheetByName("query");
  if (!sqlSheet) {
    sqlSheet = ss.insertSheet("query");
  }
  let formula = `=QUERY(${sheetName}!${range};"${sql}")`;
  sqlSheet.getRange(1, 1).setFormula(formula);
  let values = sqlSheet.getDataRange().getValues();
  if (values[0][0] == "#N/A") values = [[""]];
  return values;
};

function a() {
  // Logger.log(JSON.stringify(query({ss: SpreadsheetApp.openById("1Lh7RPc_JNJaa0zHFVj-XZSZsdYKi10NY3Idw8bm1Wrw"), sheetName: "data", range: "A1:I29999999", sql: "select B, C, D, E, H where H = 202205061 limit 1"})))
  Logger.log(services({ id: 1 }));
}

const fileUpload = (fileName, base64, moveId) => {
  try {
    let spitBase = base64.split(",");
    let type = spitBase[0].split(";")[0].replace("data", "");
    let file = Utilities.newBlob(Utilities.base64Decode(spitBase[1]));
    file = Drive.Files.insert({ title: fileName, mimeType: type }, file);
    let fileId = file.getId();
    DriveApp.getFileById(fileId).moveTo(DriveApp.getFolderById(moveId));
    return { name: "fileUpload", result: true, id: fileId };
  } catch (err) {
    return { name: "fileUpload", result: false, messege: "1234" };
  }
};

const encode = (value) => {
  let str = String(value),
    result = "";
  for (let i = 0; i < str.length; i++) {
    let ascii = str[i].charCodeAt();
    result += parseInt(ascii / 18) + String(ascii % 18).padStart(2, "0");
  }
  return "p" + result;
};

const decode = (code) => {
  let en = [];
  for (let i = 0; i < code.length; i += 3) {
    let x = 18 * code[i] + Number(code.substr(i + 1, 2));
    en.push(x);
  }
  let result = String.fromCharCode(...en);
  return result;
};

const login = (data) => {
  const { userName, password } = data;
  try {
    const ss = SpreadsheetApp.openById(AdminDataBase);
    const info = query({
      ss: ss,
      sheetName: "login",
      range: "A1:D1",
      sql: `select B, C, D where A = '${userName}' limit 1`,
    });
    if (info[0][0] != "") {
      if (info[0][0] == encode(password)) {
        return {
          result: true,
          name: "login",
          messege: info[0][1],
          backup: info[0][2],
          data: getUser({ database: info[0][1] }).data,
        };
      } else {
        return {
          result: false,
          name: "login",
          messege: "password",
        };
      }
    } else {
      return {
        result: false,
        name: "login",
        messege: "email",
      };
    }
  } catch (err) {
    return {
      result: false,
      name: "login",
      messege: err,
    };
  }
};

const addUser = (data) => {
  const { database, email: user } = data;
  let ss = SpreadsheetApp.openById(database);
  let sheet = ss.getSheetByName("users");
  if (!sheet) {
    sheet = ss.insertSheet("users");
  }
  let lastRow = sheet.getLastRow();
  const info = query({
    ss: ss,
    sheetName: "users",
    range: `A1:C${lastRow + 1}`,
    sql: `select B  where B  = 'x${user}' limit 1`,
  });
  if (info[0][0] != "") {
    return {
      result: true,
      messege: "email",
    };
  }
  delete data.database;

  // user based new sheet for new user
  let newSS = SpreadsheetApp.create(user);
  newSS.insertSheet("sendEmail");
  newSS.insertSheet("inbox");
  let newSheetId = newSS.getId();
  DriveApp.getFileById(newSheetId).moveTo(
    DriveApp.getFolderById(UserDriveFolderId)
  );
  data.userSheet = newSheetId;
  data.date = new Date().toISOString();
  let userData = [];
  for (let x in data) {
    userData.push("x" + data[x]);
  }
  sheet.insertRowBefore(1).getRange("A1:F1").setValues([userData]);
  let data_ = query({
    ss: ss,
    sheetName: "users",
    range: `B1:F${lastRow + 1}`,
    sql: "select B, C, D, E, F",
  });
  if (data_[0][0] == "") data_ = [];
  return {
    result: true,
    messege: "success",
    data: data_,
  };
};

const getUser = (data) => {
  const { database } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("users");
    if (!sheet) {
      sheet = ss.insertSheet("users");
    }
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "users",
      range: `B1:F${lastRow + 1}`,
      sql: "select B, C, D, E, F",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
    };
  } catch (err) {
    return {
      result: false,
      name: "getUser",
    };
  }
};

const editUser = (data) => {
  const { database, id } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    delete data.database;
    let sheet = ss.getSheetByName("users");
    if (!sheet) {
      sheet = ss.insertSheet("users");
    }
    let userData = [];
    for (let x in data) {
      userData.push("x" + data[x]);
    }
    userData.pop();
    sheet
      .getRange(`A${Number(id) + 1}:D${Number(id) + 1}`)
      .setValues([userData]);
    return {
      result: true,
    };
  } catch (err) {
    return {
      result: false,
      name: "editUser",
    };
  }
};

const deleteUser = (data) => {
  let { database, id } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    delete data.database;
    let sheet = ss.getSheetByName("users");
    let lastRow = sheet.getLastRow();
    id = lastRow - id + 1;
    if (!sheet) {
      sheet = ss.insertSheet("users");
    }
    //sheet.getRange(`F${id}`).setValue("0");
    let sheetId = sheet
      .getRange("F" + id)
      .getValue()
      .substr(1);
    let userSheet = SpreadsheetApp.openById(sheetId);
    let inbox = userSheet.getSheetByName("inbox");
    let inboxLast = inbox.getLastRow();
    for (let x = 1; x <= inboxLast; x++) {
      Drive.Files.remove(
        inbox
          .getRange("F" + x)
          .getValue()
          .substr(1)
      );
    }

    let documents = userSheet.getSheetByName("sendEmail");
    let documentsLast = documents.getLastRow();
    for (let x = 1; x <= documentsLast; x++) {
      Drive.Files.remove(
        documents
          .getRange("F" + x)
          .getValue()
          .substr(1)
      );
    }

    Drive.Files.remove(sheetId);

    sheet.deleteRow(id);
    lastRow = sheet.getLastRow();
    let data_ = query({
      ss: ss,
      sheetName: "users",
      range: `B1:F${lastRow + 1}`,
      sql: "select B, C, D, E, F",
    });
    if (data_[0][0] == "") data_ = [];
    return {
      result: true,
      data: data_,
    };
  } catch (err) {
    return {
      result: false,
      name: "deleteUser",
    };
  }
};

const changePassward = (data) => {
  try {
    let { oldPass, newPass, database } = data;
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("login");
    if (sheet.getRange("B1").getValue() !== encode(oldPass)) {
      return {
        result: true,
        messege: "pass",
      };
    }
    sheet.getRange("B1").setValue(encode(newPass));
    return {
      result: true,
      messege: "success",
    };
  } catch (err) {
    return {
      result: false,
      messege: err,
      name: "passwordInit",
    };
  }
};

const getDocument = (data) => {
  const { database } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("documents");
    if (!sheet) {
      sheet = ss.insertSheet("documents");
    }
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "documents",
      range: `A1:C${lastRow + 1}`,
      sql: "select A, B, C",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
    };
  } catch (err) {
    return {
      result: false,
      name: "getDocument",
    };
  }
};

const addDocument = (data) => {
  let { database, file, fileName } = data;
  file = fileUpload(
    fileName + new Date().getTime(),
    file,
    DocumentDriveFolderId
  ).id;
  data.file = file;
  let ss = SpreadsheetApp.openById(database);
  let sheet = ss.getSheetByName("documents");
  if (!sheet) {
    sheet = ss.insertSheet("documents");
  }
  delete data.database;
  data.date = new Date().toISOString();
  let userData = [];
  for (let x in data) {
    userData.push("x" + data[x]);
  }
  sheet.insertRowBefore(1).getRange("A1:C1").setValues([userData]);
  let lastRow = sheet.getLastRow();
  let data_ = query({
    ss: ss,
    sheetName: "documents",
    range: `A1:C${lastRow + 1}`,
    sql: "select A, B, C",
  });
  if (data_[0][0] == "") data_ = [];
  return {
    result: true,
    messege: "success",
    data: data_,
  };
};

const editDocument = (data) => {
  const { database, id } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    delete data.database;
    let sheet = ss.getSheetByName("documents");
    if (!sheet) {
      sheet = ss.insertSheet("documents");
    }
    let userData = [];
    for (let x in data) {
      userData.push("x" + data[x]);
    }
    userData.pop();
    sheet
      .getRange(`A${Number(id) + 1}:C${Number(id) + 1}`)
      .setValues([userData]);
    return {
      result: true,
    };
  } catch (err) {
    return {
      result: false,
      name: "editDocument",
    };
  }
};

const deleteDocument = (data) => {
  const { database, id } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    delete data.database;
    let sheet = ss.getSheetByName("documents");
    if (!sheet) {
      sheet = ss.insertSheet("documents");
    }
    let fileId = sheet.getRange("C" + id).getValue();
    Drive.Files.remove(fileId.substr(1));
    sheet.deleteRow(id);
    let lastRow = sheet.getLastRow();
    let data_ = query({
      ss: ss,
      sheetName: "documents",
      range: `A1:C${lastRow + 1}`,
      sql: "select A, B, C",
    });
    if (data_[0][0] == "") data_ = [];
    return {
      result: true,
      data: data_,
    };
  } catch (err) {
    return {
      result: false,
      name: "deleteDocuments",
    };
  }
};

const getInbox = (data) => {
  const { database } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("inbox");
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "inbox",
      range: `A1:F${lastRow + 1}`,
      sql: "select E, D, C, B, F",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
      user: ss.getName(),
      database: database,
    };
  } catch (err) {
    return {
      result: false,
      name: "getInbox",
    };
  }
};

const deleteInbox = (data) => {
  const { database, id: index } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("inbox");
    let fileId = sheet.getRange(`F${index}`).getValue();
    Drive.Files.remove(fileId.substr(1));
    sheet.deleteRow(index);
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "inbox",
      range: `A1:F${lastRow + 1}`,
      sql: "select E, D, C, B, F",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
      user: ss.getName(),
      database: database,
    };
  } catch (err) {
    return {
      result: false,
      name: "deleteInbox",
    };
  }
};

const p = () => {
  Logger.log(
    searchInbox({
      database: "1wCkE1aXpi5jbBcZ4kkP4w7AnoT9ND8ZS-SCbEPb-jNk",
      type: "string",
      value: "12-01-2000",
    })
  );
};

const searchInbox = (data) => {
  const { database, type, value } = data;
  let row = type == "date" ? "D" : "B";
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("inbox");
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "inbox",
      range: `A1:F${lastRow + 1}`,
      sql: `select B, D, F where LOWER(${row})like  LOWER('%${value}%')`,
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
    };
  } catch (err) {
    return {
      result: false,
      name: "searchInbox",
    };
  }
};

const backupEmail = (data) => {
  const { database, email } = data;
  let ss = SpreadsheetApp.openById(database);
  let sheet = ss.getSheetByName("login");
  sheet.getRange("D1").setValue(email);
  return {
    result: true,
    messege: "success",
  };
};

const forgetTest = () => {
  Logger.log(forgetPassword());
};

const forgetPassword = () => {
  let emailTemplate = `\`
    <div>
    <p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">
    Password for Valley OBGYN Forms Admin Panel Login.
    </span></p>
    <p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>
    <p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif"> 
      \${password}
    </span></p>
    </div>
  \``;

  const ss = SpreadsheetApp.openById(AdminDataBase);
  let password = ss.getSheetByName("login").getRange("B1").getValue();

  password = decode(password.substr(1));

  MailApp.sendEmail({
    to: AdminEmail,
    subject: "Valley OBGYN Forms Admin Panel Login Password",
    htmlBody: eval(emailTemplate),
  });

  return {
    result: true,
    messege: "success",
  };
};

const getData64 = (data) => {
  let { id } = data;
  let file = DriveApp.getFileById(id).getBlob();
  let base64 = Utilities.base64Encode(file.getBytes());
  return {
    result: true,
    data: base64,
  };
};

const getHistory = (data) => {
  const { database } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("sendEmail");
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "sendEmail",
      range: `A1:F${lastRow + 1}`,
      sql: "select E, D, C, B, F",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
      user: ss.getName(),
      database: database,
    };
  } catch (err) {
    return {
      result: false,
      name: "getHistory",
    };
  }
};

const deleteHistory = (data) => {
  const { database, id: index } = data;
  try {
    let ss = SpreadsheetApp.openById(database);
    let sheet = ss.getSheetByName("sendEmail");
    let fileId = sheet.getRange(`F${index}`).getValue();
    Drive.Files.remove(fileId.substr(1));
    sheet.deleteRow(index);
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "sendEmail",
      range: `A1:F${lastRow + 1}`,
      sql: "select E, D, C, B, F",
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
      user: ss.getName(),
      database: database,
    };
  } catch (err) {
    return {
      result: false,
      name: "deleteHistory",
    };
  }
};

const form = {
  0: login,
  1: getUser,
  2: addUser,
  3: editUser,
  4: deleteUser,
  5: changePassward,
  6: getDocument,
  7: addDocument,
  8: editDocument,
  9: deleteDocument,
  10: getInbox,
  11: deleteInbox,
  12: searchInbox,
  13: backupEmail,
  14: forgetPassword,
  15: getData64,
  16: getHistory,
  17: deleteHistory,
};

const doPost = (e) => {
  try {
    let { type, data } = e.parameter,
      result;
    result = form[type](JSON.parse(data));
    return ContentService.createTextOutput(
      JSON.stringify({
        result: true,
        name: "doPost",
        messege: JSON.stringify(result),
      })
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        result: false,
        name: "doPost",
        messege: err,
      })
    );
  }
};

const doGet = (e) => {
  return ContentService.createTextOutput("Oops! 404 not found.");
};
