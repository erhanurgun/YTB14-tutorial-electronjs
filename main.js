const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  // file://electron/main.html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  ipcMain.on("key:inputValue", (err, data) => {
    console.log(data);
  });
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Yeni TODO Ekle",
      },
      {
        label: "Tümünü Sil",
      },
      {
        type: "separator",
      },
      {
        label: "Çıkış",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  },
];

if (process.platform === "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO",
  });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Geliştirici Araçları",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Yenile",
        role: "reload",
      },
    ],
  });
}
