const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate'); // Added Update button
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

btnCreate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  // Ensure the directory exists before attempting to create the file
  fs.mkdir(pathName, { recursive: true }, (err) => {
    if (err) {
      alert("An error occurred creating the directory: " + err.message);
      return console.error(err);
    }

    fs.writeFile(file, contents, function(err) {
      if (err) {
        alert("An error occurred creating the file: " + err.message);
        return console.error(err);
      }

      var txtfile = document.getElementById("fileName").value;
      alert(txtfile + " text file was created");
      console.log("The file was created");
    });
  });
});

btnRead.addEventListener('click', function() {
  let filePath = fileName.value.trim(); // Trim to handle potential whitespace

  // Check if the file path is empty
  if (!filePath) {
    alert("Please enter a valid file name.");
    return;
  }

  let file = path.join(pathName, filePath);

  // Check if the file exists before attempting to read
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      alert("File does not exist or cannot be accessed. Please check the file name.");
      console.error(err);
      return;
    }

    // File exists, proceed with reading
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        alert("An error occurred reading the file: " + err.message);
        return console.error(err);
      }

      fileContents.value = data;
      console.log("The file was read!");
    });
  });
});

  

btnUpdate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  fs.writeFile(file, contents, function(err) {
    if (err) {
      alert("An error occurred updating the file: " + err.message);
      return console.error(err);
    }

    var txtfile = document.getElementById("fileName").value;
    alert(txtfile + " text file was updated");
    console.log("The contents of the file were updated");
  });
});

btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
  
    // Check if the file exists before attempting to delete
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        alert("File does not exist or cannot be accessed.");
        console.error(err);
        return;
      }
  
      // File exists, proceed with deletion
      fs.unlink(file, function(err) {
        if (err) {
          alert("An error occurred deleting the file: " + err.message);
          return console.error(err);
        }
  
        alert("File successfully deleted.");
        fileName.value = "";
        fileContents.value = "";
        console.log("The file was deleted!");
      });
    });
  });
  
