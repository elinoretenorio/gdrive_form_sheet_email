function Initialize() {
    var triggers = ScriptApp.getScriptTriggers();
  
    for (var i in triggers) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  
    ScriptApp.newTrigger("LessonFeedbackFormNotification")
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onFormSubmit()
      .create();
  }
  
  function LessonFeedbackFormNotification(e) {
    try {
      var email = [];
  
      email[0] = "john@example.com";
      email[1] = "jane@example.com";
      email[2] = "sam@example.com";
  
      var subject =
        "[Lesson Feedback] " +
        e.namedValues["Subject"].toString() +
        " with " +
        e.namedValues["Teacher Name"].toString();
  
      var s = SpreadsheetApp.getActiveSheet();
      var headers = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
      var message = "";
  
      for (var i in headers) {
        if (headers[i] != "") {
          message += headers[i] + ": " + e.namedValues[headers[i]].toString() + "\n\n";
        }
      }
  
      for (var i = 0; i < email.length; i++) {
        MailApp.sendEmail(email[i], subject, message);
      }
    } catch (e) {
      Logger.log(e.toString());
    }
  }
  