// NPM Packages
const express = require('express');
const router = express.Router();
const UserData = require('../models/userData');
const fs = require('fs');
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

router.get("/CSVerror", function(req, res, next) {
  res.send("The entry for the CSV file was incorrect. Please check your sheet and try again.");

})
router.post('/csvAddition', upload.single('input'), function(req, res, next) {
  const file = req.file;//s.inputFile;
  //console.log(file.path)
  fs.readFile(file.path, 'utf-8', (err, data) => {
    
    var allTextLines = data.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    //Upload csv data into MongoDB
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

          const date = new Date(data[4]);

          if(Object.prototype.toString.call(date) === "[object Date]") {
            const newUser = new UserData({
              bio: {
                first_name: data[0], 
                last_name: data[1], 
                phone_number: data[2], 
                email: data[3], 
                date_of_birth: date, 
                street_address: data[5], 
                city: data[6],
                state: data[7],
                zip_code: data[8]
              }});

            newUser.save().catch(console.log);
            console.log("Added " + data[0] + " " + data[1]);

          } else {
            //console.log("Date of birth " + data[4] + " for email " + data[3] + " is invalid");
            //Response.Write("<script>alert('Hello');</script>");
            res.redirect('/error');
          }




          


        }
    }
    
    res.redirect('/');

  });
  //res.send(file.path);

});


module.exports = router;
