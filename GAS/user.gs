const emailTemplete = `\`
<div>
<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">You have a secure message. Please enter your
date of birth in the link to read the message.</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif"> <a href="\${link}">\${link}</a></span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">Thank you.</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">Valley OBGYN Medical Group Inc.</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">1600 East Florida Avenue, Suite 315</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">Hemet, CA 92544</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">Phone: (951) 765-1766</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><a href="http://www.valleyobcare.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.valleyobcare.com/&amp;source=gmail&amp;ust=1658844940452000&amp;usg=AOvVaw3UW1gth0C5Cu9DcpSS9GJT"><span style="font-size:12pt;font-family:Arial,sans-serif;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial">http://www.valleyobcare.com</span></a><span style="font-size:12pt;font-family:Arial,sans-serif"><br>
&nbsp;<br>
<br>
</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:black"></span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif;color:black">FOR YOUR PROTECTION THE LINK AND ALL FILES WILL
AUTO DELETE IN 7 DAYS.</span></p>

<p class="MsoNormal" style="margin:0in;line-height:normal;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;font-family:Arial,sans-serif;color:black">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:107%;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;line-height:107%;font-family:Arial,sans-serif;color:black">NOTICE: THIS MESSAGE IS CONFIDENTIAL, INTENDED FOR THE NAMED
RECIPIENT(S) AND MAY CONTAIN INFORMATION THAT IS (I) PROPRIETARY TO THE SENDER,
AND/OR, (II) PRIVILEGED, CONFIDENTIAL, AND/OR OTHERWISE EXEMPT FROM DISCLOSURE
UNDER APPLICABLE STATE AND FEDERAL LAW, INCLUDING, BUT NOT LIMITED TO, PRIVACY
STANDARDS IMPOSED PURSUANT TO THE FEDERAL HEALTH INSURANCE PORTABILITY AND
ACCOUNTABILITY ACT OF 1996 ("HIPAA"). IF YOU ARE NOT THE INTENDED
RECIPIENT, OR THE EMPLOYEE OR AGENT RESPONSIBLE FOR DELIVERING THE MESSAGE TO
THE INTENDED RECIPIENT, YOU ARE HEREBY NOTIFIED THAT ANY DISSEMINATION, DISTRIBUTION
OR COPYING OF THIS COMMUNICATION IS STRICTLY PROHIBITED. IF YOU HAVE RECEIVED
THIS TRANSMISSION IN ERROR, PLEASE NOTIFY US IMMEDIATELY BY TELEPHONE AT (951)
765-1766, AND DESTROY THE ORIGINAL TRANSMISSION AND ITS ATTACHMENTS WITHOUT
READING OR SAVING THEM TO DISK. THANK YOU.</span></p>

<p class="MsoNormal" style="margin:0in;line-height:107%;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-size:12pt;line-height:107%;font-family:Arial,sans-serif;color:black">&nbsp;</span></p>

<p class="MsoNormal" style="margin:0in;line-height:107%;font-size:11pt;font-family:Calibri,sans-serif"><span style="font-family:Arial,sans-serif;color:red;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial">PLEASE NOTE: THIS E-MAIL MESSAGE WAS SENT FROM A
NOTIFICATION-ONLY ADDRESS THAT CANNOT ACCEPT INCOMING E-MAIL. PLEASE DO NOT
REPLY TO THIS MESSAGE.</span></p></div>
\``;

const AdminDataBase = "1wCkE1aXpi5jbBcZ4kkP4w7AnoT9ND8ZS-SCbEPb-jNk";
const InboxFolderId = "1M4n1UprfSuK9QC0B4PI_SwR4WpdxYKq8";
const HistoryFolderId = "1OwBMe38e-D8wDMFn5HsIWY13cMWulLMS";

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

const ipTest = () => {
  Logger.log(ipCheck("12.1.12.3", "12.3.12.3,12.1.12.5"));
};

const ipCheck = (ip, ips) => {
  ip = ip.split(".");
  ip.pop();
  ip = ip.join(".");
  if (ips == "") return true;
  ips = ips.replace(/ /g, "").split(",");
  for (let x of ips) {
    if (x.indexOf(ip) >= 0) return true;
  }
  return false;
};

const login = (data) => {
  const { userName, password, ip } = data;
  try {
    const ss = SpreadsheetApp.openById(AdminDataBase);
    let sheet = ss.getSheetByName("users");
    if (!sheet) {
      sheet = ss.insertSheet("users");
    }
    let lastRow = sheet.getLastRow();
    const info = query({
      ss: ss,
      sheetName: "users",
      range: `A1:F${lastRow + 1}`,
      sql: `select C, D, E, F where B= 'x${userName}' limit 1`,
    });
    let ss2 = SpreadsheetApp.openById(AdminDataBase);
    let sheet2 = ss.getSheetByName("documents");
    if (!sheet) {
      sheet2 = ss2.insertSheet("documents");
    }
    let lastRow2 = sheet2.getLastRow();
    let data_ = query({
      ss: ss2,
      sheetName: "documents",
      range: `B1:C${lastRow2 + 1}`,
      sql: "select B, C",
    });
    if (data_[0][0] == "") data_ = [];
    if (info[0][0] != "") {
      if (info[0][0] == "x" + password) {
        if (!ipCheck(ip, info[0][2].substr(1))) {
          return {
            result: true,
            name: "login",
            messege: "ip",
          };
        }
        return {
          result: true,
          name: "login",
          messege: info[0][3].substr(1),
          history: info[0][1].substr(1),
          data: data_,
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

const getDocument = (data) => {
  //let database = "1wCkE1aXpi5jbBcZ4kkP4w7AnoT9ND8ZS-SCbEPb-jNk"
  let { database } = data;
  try {
    let ss = SpreadsheetApp.openById(AdminDataBase);
    let sheet = ss.getSheetByName("documents");
    let lastRow = sheet.getLastRow();
    let data = query({
      ss: ss,
      sheetName: "documents",
      range: `A1:C${lastRow + 1}`,
      sql: "select B, C",
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

const eT = () => {
  Logger.log(sendEmail({ email: "fahim.infc@gmail.com" }));
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

const sendEmail = (data) => {
  let { email, database, file, docName: fileName } = data;
  file = fileUpload(fileName + new Date().getTime(), file, HistoryFolderId).id;
  data.file = file;
  let ss = SpreadsheetApp.openById(database);
  let sheet = ss.getSheetByName("sendEmail");
  let lastRow = sheet.getLastRow();
  data.id = new Date().getTime().toString().slice(-5) + "" + (lastRow + 1);
  data.time = new Date().getTime();
  let userData = [];
  delete data.database;
  for (let x in data) {
    userData.push("x" + data[x]);
  }
  userData[0] = userData[0].substr(1);
  //data.time = new Date().getTime();
  userData.push(0);

  const link =
    "https://valleyobform.github.io/client?i=" + data.id + "&b=" + database;

  let bcc = SpreadsheetApp.openById(AdminDataBase)
    .getSheetByName("login")
    .getRange("D1")
    .getValue();
  bcc = bcc ? bcc : undefined;
  MailApp.sendEmail({
    to: email,
    bcc: bcc,
    subject: "Valley OBGYN Secure Message",
    htmlBody: eval(emailTemplete),
  });
  userData.push("sent");
  userData.push("");
  userData.push("");
  userData.push("=ROW(A1)");
  sheet.insertRowBefore(1).getRange("A1:L1").setValues([userData]);

  return {
    result: true,
    messege: "success",
    email: MailApp.getRemainingDailyQuota(),
  };
};

const getInbox = (data) => {
  let { database } = data;
  try {
    // let {database } = data;
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
    };
  } catch (err) {
    return {
      result: false,
      name: "getInbox",
    };
  }
};

const searchInbox = (data) => {
  const { type, value } = data;
  let row = type == "date" ? "D" : "B";
  try {
    let ss = SpreadsheetApp.openById(
      "1wCkE1aXpi5jbBcZ4kkP4w7AnoT9ND8ZS-SCbEPb-jNk"
    );
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

const getHistory = (data) => {
  let { database, history } = data;
  try {
    history = history * 24 * 60 * 60 * 1000;
    let now = new Date().getTime();
    let ss = SpreadsheetApp.openById(database);

    let sheet = ss.getSheetByName("sendEmail");
    let lastRow = sheet.getLastRow();
    if (lastRow == 0) {
      return {
        result: true,
        data: [],
      };
    }
    let data = query({
      ss: ss,
      sheetName: "sendEmail",
      range: `A1:F${lastRow + 1}`,
      sql: "select E, D, C, B where (" + now + " - A) <= " + history,
    });
    if (data[0][0] == "") data = [];
    return {
      result: true,
      data: data,
    };
  } catch (err) {
    return {
      result: false,
      name: "getInbox",
    };
  }
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

const form = {
  0: login,
  1: getDocument,
  2: sendEmail,
  3: getInbox,
  4: searchInbox,
  5: getHistory,
  6: getData64,
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
