const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {

    allowRendererProcessReuse = false;

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // console.log(process.platform);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file",
            slashes: true

        }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("key", (err, data) => {
        console.log(data);
    })

    ipcMain.on("key:inputValue", (err, data) => {
        debugger;
        console.log(data);
    })

    //Yeni Pencere 
    ipcMain.on("key:newWindow", (err, data) => {
        createWindow();
    });

    mainWindow.on("close", () => {
        app.quit();
    })

});

const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Yeni TODO Ekle"
            }
            ,
            {
                label: "Tümünü Sil"
            },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    },

]

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
}

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Geliştirici pencersini aç",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Yenile",
                role: "reload"
            }
        ]
    })
}


function createWindow() {
    addwindow = new BrowserWindow({
        width: 482,
        height: 200,
        title: "Yeni Bir Pencere"
    });

    addwindow.loadURL(url.format({
        pathname: path.join(__dirname, "modal.html"),
        protocol: "file",
        slashes: true
    }));

    addwindow.on("close", () => {
        addwindow = null;
    })

}