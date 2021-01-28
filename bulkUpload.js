var admin = require("firebase-admin");

var serviceAccount = require("./tulapp-87336-firebase-adminsdk-c6xyy-6a4acf17ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});