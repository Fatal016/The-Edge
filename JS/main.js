const { debug, error } = require("console")
const {app, BrowserWindow, ipcMain} = require("electron")
const path = require("path")

const fs = require("fs");
const storage = require("electron-json-storage")

const axios = require("axios");
const rarbgApi = require("rarbg-api");
const { resolve } = require("path");

let mainWindow;

const axiosLookupOptions = {
  method: "GET",
  url: "https://imdb8.p.rapidapi.com/auto-complete",
  params: {q: ""},
  headers: {
    "X-RapidAPI-Key": "823db4503emshf275abc2acc566dp1874e1jsn2805dc79ab2f",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
  }
};

const windowOptions = {
  width: 1280,
  height: 720,
  //fullscreen: storage.get("preference_fullscreen"),
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: path.join(__dirname, "preload.js")
  }
};


//const { electron } = require("process")
//const { Menu, MenuItem } = require("electron/main")
//const defaultDataPath = storage.getDefaultDataPath()



function createWindow(winPath) {
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadFile(winPath);
  mainWindow.webContents.openDevTools();
};

ipcMain.handle("search", async (event, arg) => {
  return new Promise(function(resolve, reject) {
    mainWindow.loadFile("../HTML/index.html");
    //loadNewWindow("./gallery.html")
    //axios.request(axiosLookupOptions)
    var response = "something"
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    })
  });
});

ipcMain.handle("HomeClick", async (event, arg) => {
  return new Promise(function(resolve, reject) {
    mainWindow.loadFile("../HTML/index.html")
    var response = "Home page loaded successfully"
    .then(function(response) {
      resolve(response.data);
    })
    .catch(function(error) {
      reject(error);
    })
  });
});


app.whenReady().then(() => {
  createWindow("../HTML/index.html");
});

/*
app.on("ready", function() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menuTemplate);
});
*/

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});